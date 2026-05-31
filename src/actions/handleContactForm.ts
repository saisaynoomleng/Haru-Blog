'use server';

import { ContactUsEmail } from '@/components/emails/ContactUsEmail';
import db from '@/db';
import { ContactTable } from '@/db/schema/contacts.schema';
import { resend } from '@/lib/email';
import { env } from '@/lib/env/server';
import { PrevFormStateProps } from '@/lib/types';
import { ContactFormSchema } from '@/lib/validations';

export const handleContactForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const result = ContactFormSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
        field: result.error.issues[0].path.join('.'),
      };
    }

    const { name, email, message, subject } = result.data;

    await db
      .insert(ContactTable)
      .values({
        name,
        email,
        message,
        subject,
        status: 'new',
      })
      .onConflictDoNothing();

    const resendEmail = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: `We’ve Received Your Message — Haru Blog`,
      react: ContactUsEmail({ name }),
    });

    if (resendEmail.error) {
      return {
        success: false,
        message: `Resend Email Error! ${resendEmail.error.message}`,
      };
    }

    return {
      success: true,
      message: 'Your Message has reached us!',
    };
  } catch (error) {
    console.error('Contact Form error', error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
