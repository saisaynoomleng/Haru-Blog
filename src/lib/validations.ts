import * as z from 'zod';

export const ClerkWebhookPayloadSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_addresses: z.array(
    z.object({
      id: z.string(),
      email_address: z.string(),
    }),
  ),
  id: z.string(),
  image_url: z.string(),
});

export const NewsletterSubscriptionSchema = z.object({
  email: z.email().min(1, 'Must have at least 1 character'),
});

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.email().min(1, 'Must have at least 1 character'),
  subject: z.string(),
  message: z
    .string()
    .min(100, 'Message Must have at least 100 characters')
    .max(1000, 'Message cannot exceed 1000 character'),
});

export const ReviewFormSchema = z.object({
  title: z.string().min(1, 'Title must have at least one character'),
  username: z.string().min(1, 'Username must have at least one character'),
  role: z.string().min(1, 'Role must have at least one character'),
  rating: z.coerce.number().min(1).max(5),
  body: z
    .string()
    .min(20, 'Review text must have at least 20 characters')
    .max(1000, 'Review text cannot exceed 1000 characters'),
});
