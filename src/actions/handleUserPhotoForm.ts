'use server';

import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { PrevFormStateProps } from '@/lib/types';
import { UserPhotoFormSchema } from '@/lib/validations';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const handleUserPhotoForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const file = formData.get('imageUrl');
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (file && file instanceof File && file.size > 0) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024;
      const ALLOWED = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/avif',
      ];

      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message: 'File size exceeds 2MB',
        };
      }

      if (!ALLOWED.includes(file.type)) {
        return {
          success: false,
          message: 'Invalid file type',
        };
      }

      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      const result = UserPhotoFormSchema.safeParse({
        imageUrl: blob.url,
      });

      if (!result.success) {
        return {
          success: false,
          message: result.error.issues[0].message,
        };
      }

      const { imageUrl } = result.data;

      (await clerkClient()).users.updateUserProfileImage(userId, { file });

      await db
        .update(UserTable)
        .set({
          imageUrl,
        })
        .where(eq(UserTable.clerkUserId, userId));
    }

    revalidatePath('/user');

    return {
      success: true,
      message: 'Profile photo updated!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
