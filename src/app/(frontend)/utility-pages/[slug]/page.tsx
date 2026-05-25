import Bounded from '@/components/shared/Bounded';
import { DynamicUtilityPageProps } from '@/lib/types';
import { sanityFetch } from '@/sanity/lib/live';
import { UTILITY_PAGE_QUERY, UTILITY_PAGES_QUERY } from '@/sanity/lib/queries';
import { SanityPortableText } from '@/sanity/schemaTypes/components/sanityPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';

const getPage = async (params: Promise<{ slug: string }>) =>
  sanityFetch({ query: UTILITY_PAGE_QUERY, params: await params });

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: UTILITY_PAGES_QUERY,
    perspective: 'published',
    stega: false,
  });

  return pages.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: DynamicUtilityPageProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) return {};

  const metadata: Metadata = {
    title: page.seo.title,
    description: page.seo.description,
  };

  if (page.seo.noIndex) {
    metadata.robots = 'noIndex';
  }

  return metadata;
}

const DynamicUtilityPage = async ({ params }: DynamicUtilityPageProps) => {
  const { data: page } = await getPage(params);

  if (!page) return null;

  return (
    <Bounded as="main">
      <h2 className="font-semibold text-fs-500 md:text-fs-600">{page.name}</h2>

      {page.body && (
        <div className="prose min-w-full">
          <PortableText value={page.body} components={SanityPortableText} />
        </div>
      )}
    </Bounded>
  );
};

export default DynamicUtilityPage;
