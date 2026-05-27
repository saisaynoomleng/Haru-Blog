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
  email: z
    .email('Must be a valid email address')
    .min(1, 'Must have at least 1 character'),
});
