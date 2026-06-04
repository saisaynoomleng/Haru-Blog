'use server';

import { PrevFormStateProps } from '@/lib/types';
import { UserPasswordFormSchema } from '@/lib/validations';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const handleUserPassword = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const rawData = Object.entries(formData.entries());

    const result = UserPasswordFormSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    const { newPassword, confirmNewPassword } = result.data;

    if (newPassword !== confirmNewPassword) {
      return {
        success: false,
        message: 'Password must match',
      };
    }

    return {
      success: true,
      message: 'Password Updated!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
