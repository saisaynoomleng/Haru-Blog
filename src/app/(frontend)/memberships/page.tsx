import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { ProductCard } from '@/components/shared/ProductCard';
import { MembershipCardSkeleton } from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import { MEMBERSHIPS_QUERY } from '@/sanity/lib/queries';
import { Suspense } from 'react';

export async function getStaticParams() {
  const { data: memberships } = await sanityFetch({
    query: MEMBERSHIPS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return memberships.slice(0, 10).map((m) => ({
    slug: m.slug,
  }));
}

const MembershipsPage = async () => {
  const { data: memberships } = await sanityFetch({ query: MEMBERSHIPS_QUERY });

  if (!memberships) return <MembershipCardSkeleton />;

  return (
    <Bounded as="main">
      <Bounded padding="none" className="text-center">
        <PageTitle label="get premium access" className="uppercase font-sans" />
        <p>
          Unlock a world of fashion and lifestyle with our exclusive
          memberships. Whether you're looking to dive deeper into our content or
          enjoy VIP perks, Blogwear has a membership for you. Choose Blogwear
          Insider for full access to all our articles, early content previews,
          and personalized style guides. Or elevate your experience with
          Blogwear Elite, offering VIP access, exclusive discounts, virtual
          styling sessions, and invitations to special events. Join us today and
          take your style journey to the next level.
        </p>
      </Bounded>

      <Bounded padding="none" className="grid md:grid-cols-2 gap-4 md:gap-x-8">
        {memberships.map((m) => (
          <Suspense key={m.slug} fallback={<MembershipCardSkeleton />}>
            <ProductCard
              name={m.name || ''}
              slug={m.slug || ''}
              price={m.pricePerMonth || 0}
              body={m.desc || ''}
              features={m.features || []}
              isFeatured={m.isFeatured || false}
              media={{ imageAlt: m.imageAlt || '', imageUrl: m.imageUrl || '' }}
            />
          </Suspense>
        ))}
      </Bounded>
    </Bounded>
  );
};

export default MembershipsPage;
