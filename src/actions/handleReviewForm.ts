'use server';

import { PrevFormStateProps } from '@/lib/types';
import { ReviewFormSchema } from '@/lib/validations';
import { client } from '@/sanity/lib/client';
import { revalidatePath } from 'next/cache';

export const handleReviewForm = async (
  previousState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const today = new Date();

    const result = ReviewFormSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
        field: result.error.issues[0].path.join('.'),
      };
    }

    const { title, username, role, rating, body } = result.data;

    await client.create({
      _type: 'review',
      title,
      username,
      role,
      rating,
      body,
      status: 'new',
      reviewedAt: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
    });

    revalidatePath('/reviews');

    return {
      success: true,
      message: 'Your review is submitted!',
    };
  } catch (error) {
    console.error('Review Form error', error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
