import BackTo from '@/components/shared/BackTo';
import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { BlogCardSkeleton } from '@/components/shared/Skeletons';
import { socialIcons } from '@/lib/dataAccessLayer';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { AUTHOR_QUERY } from '@/sanity/lib/queries';
import { SanityPortableText } from '@/sanity/schemaTypes/components/sanityPortableText';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { data: author } = await sanityFetch({
    query: AUTHOR_QUERY,
    params: await params,
  });

  if (!author) return notFound();

  const { name, body, socialLinks, blogs, imageAlt, imageUrl } = author;

  return (
    <Bounded as="main">
      <BackTo label="all editors" href="/editors" />
      <Bounded
        padding="none"
        className="grid gap-x-6 md:gap-x-12 md:grid-cols-[auto_1fr]"
      >
        <div className="overflow-hidden relative rounded-full aspect-square min-w-40">
          {imageUrl && (
            <Image
              src={urlFor(imageUrl).format('webp').url()}
              alt={imageAlt || ''}
              fill
              sizes="(max-width: 200px) 100vw, 66vw"
              className="object-cover rounded-full"
            />
          )}
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-fs-500">{name}</p>
          {body && (
            <div className="prose-sm w-full">
              <PortableText components={SanityPortableText} value={body} />
            </div>
          )}
        </div>
        {socialLinks && socialLinks.length > 1
          ? socialLinks.map((link, i) => (
              <Link href={link.url || ''} key={i}>
                {socialIcons[link.platform as string]}
              </Link>
            ))
          : null}
      </Bounded>

      <div className="divider"></div>

      <Bounded padding="none" className="space-y-3">
        <PageTitle label="Blogs" />

        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          {blogs.map((blog) => (
            <Suspense key={blog.slug} fallback={<BlogCardSkeleton />}>
              <BlogCard
                href={blog.slug as string}
                media={{
                  imageUrl: blog.imageUrl || '',
                  imageAlt: blog.imageAlt || '',
                }}
                author={blog.author || ''}
                category={blog.cateogry || ''}
                excerpt={blog.excerpt || ''}
                title={blog.name || ''}
              />
            </Suspense>
          ))}
        </div>
      </Bounded>
    </Bounded>
  );
};

export default page;
