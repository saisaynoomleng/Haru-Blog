import NewsletterSubscription from '@/components/features/NewsletterSubscription';
import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import FeaturedBrands from '@/components/shared/FeaturedBrands';
import { Hero } from '@/components/shared/Hero';
import MemberAccessFeature from '@/components/shared/MemberAccessFeature';
import SectionTitle from '@/components/shared/SectionTitle';
import {
  FeaturedBrandsSkeleton,
  HeroSkeleton,
  MemberAccessFeatureSkeleton,
} from '@/components/shared/Skeletons';
import { YouTubeEmbeded } from '@/components/shared/YouTubeEmbeded';
import { sanityFetch } from '@/sanity/lib/live';
import {
  FEATURED_BRANDS_QUERY,
  HERO_BLOG_QUERY,
  MEMBER_ACCESS_FEATURES_QUERY,
} from '@/sanity/lib/queries';
import { Suspense } from 'react';

const HomePage = async () => {
  const { data: blogs } = await sanityFetch({ query: HERO_BLOG_QUERY });
  const { data: brands } = await sanityFetch({ query: FEATURED_BRANDS_QUERY });
  const { data: accessFeatures } = await sanityFetch({
    query: MEMBER_ACCESS_FEATURES_QUERY,
  });

  const fashion = blogs
    .filter((b) => b.category?.toLowerCase() === 'fashion')
    .slice(0, 5);

  const beauty = blogs
    .filter((b) => b.category?.toLowerCase() === 'beauty')
    .slice(0, 5);

  const mainHero = blogs[0];

  if (!mainHero) return <HeroSkeleton />;
  if (!brands) return <FeaturedBrandsSkeleton />;
  if (!accessFeatures) return <MemberAccessFeatureSkeleton />;

  return (
    <Bounded as="main">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero
          variant="default"
          media={{
            imageAlt: mainHero.imageAlt as string,
            imageUrl: mainHero.imageUrl as string,
          }}
          action={{ label: 'Read Article', href: `/blogs/${mainHero.slug}` }}
          title={mainHero.name as string}
          category={mainHero.category || ''}
          description={mainHero.excerpt as string}
          eyebrow="lt"
          scrollIndicator
        />
      </Suspense>

      <Bounded padding="none">
        <Suspense fallback={<FeaturedBrandsSkeleton />}>
          <FeaturedBrands brands={brands.featuredBrand} />
        </Suspense>
      </Bounded>

      <Bounded className="space-y-3" padding="none">
        <SectionTitle
          label="fashion"
          action={{ label: 'all articles', href: '/blogs?category=fashion' }}
        />
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <BlogCard
              key={fashion[0].slug}
              media={{
                imageAlt: fashion[0].imageAlt || '',
                imageUrl: fashion[0].imageUrl as string,
              }}
              category={fashion[0].category || ''}
              author={fashion[0].author || ''}
              title={fashion[0].name || ''}
              excerpt={fashion[0].excerpt || ''}
              href={`${fashion[0].slug}`}
              variant="textOnTop"
            />
          </div>

          <div className="columns-2 gap-3">
            {fashion.slice(1).map((blog) => (
              <BlogCard
                key={blog.slug}
                media={{
                  imageAlt: blog.imageAlt || '',
                  imageUrl: blog.imageUrl as string,
                }}
                category={blog.category || ''}
                author={blog.author || ''}
                title={blog.name || ''}
                excerpt={blog.excerpt || ''}
                href={blog.slug || ''}
                variant="default"
                className="aspect-video"
              />
            ))}
          </div>
        </div>
      </Bounded>

      <Bounded as="section" className="overflow-hidden" padding="none">
        <YouTubeEmbeded
          videoId="5NGyXTsg77E"
          title="Model Editorial shoots short clips"
        />
      </Bounded>

      <Bounded className="space-y-3" padding="none">
        <SectionTitle
          label="beauty"
          action={{ label: 'all articles', href: '/blogs?category=beauty' }}
        />
        <div className="grid md:grid-cols-2 gap-3">
          <div className="columns-2 gap-3">
            {beauty.slice(1).map((blog) => (
              <BlogCard
                key={blog.slug}
                media={{
                  imageAlt: blog.imageAlt || '',
                  imageUrl: blog.imageUrl as string,
                }}
                category={blog.category || ''}
                author={blog.author || ''}
                title={blog.name || ''}
                excerpt={blog.excerpt || ''}
                href={blog.slug || ''}
                variant="default"
                className="aspect-video"
              />
            ))}
          </div>

          <div>
            <BlogCard
              key={beauty[0].slug}
              media={{
                imageAlt: beauty[0].imageAlt || '',
                imageUrl: beauty[0].imageUrl as string,
              }}
              category={beauty[0].category || ''}
              author={beauty[0].author || ''}
              title={beauty[0].name || ''}
              excerpt={beauty[0].excerpt || ''}
              href={`${beauty[0].slug}`}
              variant="textOnTop"
            />
          </div>
        </div>
      </Bounded>

      <Bounded padding="none">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero
            variant="paperTexture"
            media={{
              imageUrl:
                'https://cdn.sanity.io/images/u19h5dbs/production/500f3fec1936cd8e2f8dc38ad742e4ed23e1b734-703x1024.jpg',
              imageAlt: 'editoral photoshoot',
            }}
            action={{ href: '/about-us', label: 'about us' }}
            title="Meet the Trendsetters Behind our Lifestyle Online Magazine"
            description="Our fashion lifestyle blog is your go-to destination for the latest trends, style tips, and inspiration. Curated by a team of passionate editors with diverse backgrounds in fashion, each post reflects a unique blend of expertise and creativity."
          />
        </Suspense>
      </Bounded>

      <Bounded padding="none">
        <div className="space-y-1">
          <h3 className="font-semibold font-sans uppercase text-fs-600 md:text-fs-700">
            all access
          </h3>
          <p className="text-brand-neutral-500">
            Subscribers enjoy more with all access
          </p>
        </div>

        <Suspense fallback={<MemberAccessFeatureSkeleton />}>
          <MemberAccessFeature features={accessFeatures.memberAccessFeatures} />
        </Suspense>
      </Bounded>

      <Bounded padding="none">
        <NewsletterSubscription />
      </Bounded>
    </Bounded>
  );
};

export default HomePage;
