import Bounded from '@/components/shared/Bounded';
import { FAQs } from '@/components/shared/FAQs';
import PageTitle from '@/components/shared/PageTitle';
import { sanityFetch } from '@/sanity/lib/live';
import { FAQs_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const FAQsPage = async () => {
  const { data: faq } = await sanityFetch({ query: FAQs_QUERY });

  if (!faq) notFound();

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <PageTitle label="Frequently asked questions" />
      </Bounded>

      <Bounded padding="none">
        {faq.map((f) => (
          <Suspense key={f.slug}>
            <FAQs
              name={f.name || ''}
              faqs={f.faqs as { title: string; body: string }[]}
            />
          </Suspense>
        ))}
      </Bounded>
    </Bounded>
  );
};

export default FAQsPage;
