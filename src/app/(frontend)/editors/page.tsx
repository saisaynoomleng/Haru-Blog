import Bounded from '@/components/shared/Bounded';
import { EditorCard } from '@/components/shared/EditorCard';
import PageTitle from '@/components/shared/PageTitle';
import { EditorCardSkeleton } from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import { AUTHORS_QUERY } from '@/sanity/lib/queries';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const { data: authors } = await sanityFetch({
    query: AUTHORS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return authors.slice(0, 100).map((author) => ({
    slug: author.slug,
  }));
}

const EditorsPage = async () => {
  const { data: authors } = await sanityFetch({ query: AUTHORS_QUERY });

  if (!authors) return <EditorCardSkeleton />;

  return (
    <Bounded as="main">
      <div className="space-y-3 text-center">
        <PageTitle
          label="Meet the editors behind Haru Blog"
          className="text-center"
        />

        <p className="text-brand-neutral-600">
          The people shaping every story, trend, and cultural moment you read on
          Haru. Curated with taste, written with intention, and edited with
          precision.
        </p>
        <p className="text-brand-neutral-600">
          Our editors are more than gatekeepers — they&apos;re storytellers,
          researchers, and cultural observers dedicated to bringing you fashion,
          celebrity, and culture content that actually matters.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {authors.map((a) => (
          <Suspense key={a.slug} fallback={<EditorCardSkeleton />}>
            <EditorCard
              name={a.name || ''}
              href={a.slug || ''}
              media={{ imageUrl: a.imageUrl || '', imageAlt: a.imageAlt || '' }}
            />
          </Suspense>
        ))}
      </div>
    </Bounded>
  );
};

export default EditorsPage;
