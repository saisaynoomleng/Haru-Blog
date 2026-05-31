import BackTo from '@/components/shared/BackTo';
import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import { BlogCardSkeleton } from '@/components/shared/Skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_QUERY } from '@/sanity/lib/queries';
import { SanityPortableText } from '@/sanity/schemaTypes/components/sanityPortableText';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

const ArticleDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });

  if (!blog) return notFound();

  const {
    imageUrl,
    name,
    imageAlt,
    author,
    category,
    minRead,
    publishedAt,
    body,
    relatedBlogs,
  } = blog;

  return (
    <Bounded as="main">
      <BackTo
        href={`/blogs?category=${category}`}
        label={`${category} articles`}
      />
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {imageUrl && (
          <Suspense fallback={<Skeleton className="w-full h-100" />}>
            <Image
              src={urlFor(imageUrl).format('webp').url()}
              alt={imageAlt || ''}
              fill
              className="object-cover w-full rounded-lg aspect-video"
              sizes="(max-width: 1000px) 100vw, 66vw"
              loading="eager"
            />
          </Suspense>
        )}
      </div>

      <div className="flex justify-between items-center">
        {publishedAt && <p>{formatDate(publishedAt)}</p>}
        {minRead && <p>{minRead} minutes read</p>}
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-fs-600 fonts-sans md:text-fs-700">
          {name}
        </h3>

        <div
          className="flex justify-between items-center font-semibold
         text-brand-primary-600"
        >
          {category && <p>{category}</p>}
          {author && (
            <p>
              By{' '}
              <Link
                href={`/editors/${author.slug}`}
                className="underline underline-offset-2"
              >
                {author.name}
              </Link>
            </p>
          )}
        </div>
      </div>

      {body && (
        <div className="min-w-full prose prose-lg">
          <PortableText value={body} components={SanityPortableText} />
        </div>
      )}

      <div className="divider" />

      <div className="space-y-6">
        <h3 className="font-bold text-fs-600 fonts-sans md:text-fs-700">
          Related Blogs
        </h3>

        <div className="flex overflow-x-auto flex-nowrap gap-x-5">
          {relatedBlogs.map((blog) => (
            <Suspense fallback={<BlogCardSkeleton />} key={blog.slug}>
              <BlogCard
                media={{
                  imageUrl: blog.imageUrl || '',
                  imageAlt: blog.imageAlt || '',
                }}
                className="min-w-50"
                author={blog.author || ''}
                category={blog.category || ''}
                title={blog.name || ''}
                href={blog.slug || ''}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default ArticleDetailsPage;
