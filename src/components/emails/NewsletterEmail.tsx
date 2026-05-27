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

export const NewsletterEmail = ({ email }: { email: string }) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-brand-neutral-50 px-2 text-shadow-brand-neutral-950 text-fs-400">
          <Preview>Welcome to Haru Blog</Preview>
          <Container className="mx-auto my-10 max-w-116.25 rounded border border-brand-primary-600 p-5">
            <Section className="mt-6">
              <Img
                src="https://cdn.sanity.io/images/u19h5dbs/production/c129f6bd286525ca395edaf80fb9a2219eaded01-611x140.png"
                alt="haru blog logo"
                className="my-0 min-w-full"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center font-normal text-fs-600!">
              Thank you for your Subscription!
            </Heading>
            <Text>Welcome to Haru Blog</Text>
            <Text>
              You&apos;re officially part of our world of fashion, celebrity
              culture, trends, and modern inspiration.
            </Text>
            {[
              {
                description: 'The latest fashion trends and style inspiration',
              },
              {
                description: 'Celebrity news and pop culture moments',
              },
              {
                description: 'Beauty, lifestyle, and cultural stories',
              },
              {
                description: 'Curated editor picks and exclusive features',
              },
            ].map((feature) => (
              <Section className="mb-9">
                <Row className="pr-8 pl-3">
                  <Column valign="top">
                    <Text className="m-0 text-gray-500 text-fs-300 leading-6">
                      {feature.description}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}
            <Text>
              Our goal is simple: deliver stylish, entertaining, and meaningful
              content you&apos;ll actually look forward to reading.
            </Text>
            <Text>
              No spam. Just curated stories, trend updates, and cultural moments
              delivered with taste.
            </Text>
            <Text>Thanks for subscribing and joining the Haru community.</Text>
            <Text>Stay inspired,</Text>
            <Text>—Haru Blog</Text>

            <Hr className="my-4 border-brand-neutral-400 border-t-2" />

            <Link href="https://www.google.com" className="inline-block">
              support@harublog
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
