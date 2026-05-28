import { env } from '@/lib/env/client';
import {
  Html,
  Body,
  Column,
  Container,
  Head,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Heading,
  Hr,
} from 'react-email';

export const ContactUsEmail = ({ name }: { name: string }) => {
  const url = env.NEXT_PUBLIC_VERCEL_PROJECT_URL;
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-brand-neutral-50 px-2 text-shadow-brand-neutral-950 text-fs-400">
          <Preview>Your Message has reached us!</Preview>
          <Container className="mx-auto my-10 max-w-116.25 rounded border border-brand-primary-600 p-5">
            <Section className="mt-6">
              <Img
                src="https://ogqxbog6vhc1huym.public.blob.vercel-storage.com/primary_logo%20%281%29.png"
                alt="haru blog logo"
                className="my-0 min-w-full"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center font-normal text-fs-600!">
              Hello {name}!
            </Heading>
            <Text>Thank you for reaching out to Haru Blog.</Text>
            <Text>
              YWe&apos;ve received your message and our team will review it as
              soon as possible. We appreciate you taking the time to contact us.
            </Text>
            <Text>
              Whether it&apos;s about fashion, culture, collaborations,
              feedback, or general inquiries — we&apos;re always excited to hear
              from our readers and community.
            </Text>
            <Text>Warm regards,</Text>
            <Text>Haru Blog Team</Text>

            <Hr className="my-4 border-brand-neutral-400 border-t-2" />

            <Text>
              Check our webstie —
              <Link href={url} className="inline-block">
                Haru Blog
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
