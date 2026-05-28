import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import { Hero } from '@/components/shared/Hero';
import { BlogCardSkeleton, HeroSkeleton } from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import { BLOGS_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: BLOGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return pages.slice(0, 100).map((p) => ({
    slug: p.slug,
  }));
}

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string }>;
}) => {
  const { data: blogs } = await sanityFetch({
    query: BLOGS_QUERY,
    params: await searchParams,
  });

  if (!blogs) return notFound();

  const featuredBlog = blogs[0];
  const allBlogs = blogs.slice(1);

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero
            variant="categorize"
            media={{
              imageUrl: featuredBlog.imageUrl as string,
              imageAlt: featuredBlog.imageAlt || '',
            }}
            action={{
              href: `/blogs/${featuredBlog.slug}`,
              label: 'Read article',
            }}
            title="Meet the Trendsetters Behind our Lifestyle Online Magazine"
            description="Our fashion lifestyle blog is your go-to destination for the latest trends, style tips, and inspiration. Curated by a team of passionate editors with diverse backgrounds in fashion, each post reflects a unique blend of expertise and creativity."
            category={featuredBlog.category as string}
          />
        </Suspense>
      </Bounded>

      <Bounded padding="none">
        <div className="flex flex-col md:flex-rows md:justify-between gap-3">
          <h3 className="font-sans text-fs-600 md:text-fs-700 uppercase">
            {featuredBlog.category} articles
          </h3>
        </div>

        <div className="columns-2 md:columns-4 gap-6">
          {allBlogs.map((blog) => (
            <div className="break-inside-avoid" key={blog.slug}>
              <Suspense fallback={<BlogCardSkeleton />}>
                <BlogCard
                  media={{
                    imageAlt: blog.imageAlt || '',
                    imageUrl: blog.imageUrl as string,
                  }}
                  href={`${blog.slug}`}
                  excerpt={blog.excerpt as string}
                  title={blog.name as string}
                  category={blog.category as string}
                  author={blog.author as string}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </Bounded>
    </Bounded>
  );
};

export default ArticlesPage;
