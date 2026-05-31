'use server';

import { NewsletterEmail } from '@/components/emails/NewsletterEmail';
import db from '@/db';
import { NewsletterSubscriptionTable } from '@/db/schema/newsletter.schema';
import { resend } from '@/lib/email';
import { env } from '@/lib/env/server';
import { PrevFormStateProps } from '@/lib/types';
import { NewsletterSubscriptionSchema } from '@/lib/validations';

export const handleNewsletter = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const data = Object.fromEntries(formData.entries());

    const result = NewsletterSubscriptionSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    const { email } = result.data;

    await db
      .insert(NewsletterSubscriptionTable)
      .values({
        email,
      })
      .onConflictDoNothing();

    const resendEmail = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Welcome to Haru Blog',
      react: NewsletterEmail(),
    });

    if (resendEmail.error) {
      return {
        success: false,
        message: resendEmail.error.message,
      };
    }

    return {
      success: true,
      message: 'Thank you for your subscription!',
    };
  } catch (error) {
    console.error('Newsletter error:', error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
