'use server';

import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { PrevFormStateProps } from '@/lib/types';
import { UserInfoFormSchema } from '@/lib/validations';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const handleUserForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    const oldEmail = user?.emailAddresses[0].emailAddress;
    const oldEmailId = user?.emailAddresses[0].id;

    if (!oldEmailId) {
      return {
        success: false,
        message: 'Email ID not found',
      };
    }

    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const rawData = Object.fromEntries(formData.entries());

    const result = UserInfoFormSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
        field: result.error.issues[0].path.join('. '),
      };
    }

    const { firstName, lastName, email } = result.data;

    (await clerkClient()).users.updateUser(userId, { firstName, lastName });

    if (oldEmail !== email) {
      (await clerkClient()).emailAddresses.createEmailAddress({
        userId,
        emailAddress: email,
        primary: true,
        verified: true,
      });

      (await clerkClient()).emailAddresses.deleteEmailAddress(oldEmailId);
    }

    await db
      .update(UserTable)
      .set({
        firstName,
        lastName,
        email,
      })
      .where(eq(UserTable.clerkUserId, userId));

    revalidatePath('/user');

    return {
      success: true,
      message: 'User Info updated!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
