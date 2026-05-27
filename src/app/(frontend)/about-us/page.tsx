import Bounded from '@/components/shared/Bounded';
import FeaturedBrands from '@/components/shared/FeaturedBrands';
import { Hero } from '@/components/shared/Hero';
import { MemberCard } from '@/components/shared/MemberCard';
import {
  FeaturedBrandsSkeleton,
  MemberCardSkeleton,
} from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import {
  FEATURED_BRANDS_QUERY,
  MEMBERS_QUERY,
  OUR_STORY_QUERY,
} from '@/sanity/lib/queries';
import { Suspense } from 'react';

const AboutUsPage = async () => {
  const { data: members } = await sanityFetch({ query: MEMBERS_QUERY });
  const { data: stories } = await sanityFetch({ query: OUR_STORY_QUERY });
  const { data: brands } = await sanityFetch({ query: FEATURED_BRANDS_QUERY });

  if (!members) return <MemberCardSkeleton />;
  if (!brands) return <FeaturedBrandsSkeleton />;

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <h2 className="font-sans text-fs-700 md:text-fs-800 uppercase">
          we are haru blog
        </h2>

        <Hero
          variant="paperTexture"
          media={{
            imageUrl:
              'https://cdn.sanity.io/images/u19h5dbs/production/d62839f2e80b9c1cc7cc989b3c9f7f51377c72f7-1518x1140.jpg',
            imageAlt: 'editoral photoshoot',
          }}
          action={{ href: '/contact-us', label: 'contact us' }}
          title="Who We Are"
          description="Fashion is more than what we wear — it’s culture, identity, movement, and self-expression. Haru explores the world of fashion through celebrity style, modern trends, runway inspiration, and stories shaping global culture today."
        />
      </Bounded>

      <Bounded padding="none">
        <Suspense fallback={<FeaturedBrandsSkeleton />}>
          <FeaturedBrands brands={brands.featuredBrand} />
        </Suspense>
      </Bounded>

      <Bounded padding="none">
        <h3 className="font-sans text-fs-600 md:text-fs-700 uppercase">
          Our Story
        </h3>

        <div className="relative border-l border-brand-neutral-300 pl-8 space-y-10">
          {stories.map((story) => (
            <div key={story.slug} className="relative">
              <div className="absolute -left-10 top-1 size-4 rounded-full border-4 border-brand-neutral-50 bg-brand-primary-700" />

              <div className="space-y-1">
                <p className="font-semibold text-fs-300 text-brand-neutral-500">
                  {story.year}
                </p>

                <p className="font-semibold text-brand-primary-700 text-fs-500">
                  {story.name}
                </p>

                <p className="text-brand-neutral-600">{story.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Bounded>

      <Bounded padding="none">
        <h3 className="font-sans text-fs-600 md:text-fs-700 uppercase">
          meet the team
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {members.map((member) => (
            <Suspense key={member.name} fallback={<MemberCardSkeleton />}>
              <MemberCard
                media={{
                  imageAlt: member.imageAlt || '',
                  imageUrl: member.imageUrl as string,
                }}
                name={member.name as string}
                role={member.role || ''}
                email={member.email as string}
              />
            </Suspense>
          ))}
        </div>
      </Bounded>
    </Bounded>
  );
};

export default AboutUsPage;
