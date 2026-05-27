import { formatTitle } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Media = {
  imageUrl: string;
  imageAlt: string;
};

type BlogCardProps = {
  className?: string;
  media: Media;
  category: string;
  author: string;
  title: string;
  excerpt?: string;
  href: string;
  variant?: 'default' | 'textOnTop';
};

const Banner = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        clsx('font-semibold bottom-3 px-2 py-1 rounded-2xl border', className),
      )}
    >
      {children}
    </p>
  );
};

const BlogImage = ({
  imageAlt,
  imageUrl,
  className,
  variant,
}: {
  imageUrl: string;
  imageAlt: string;
  className?: string;
  variant: 'default' | 'textOnTop';
}) => {
  return (
    <Image
      src={urlFor(imageUrl).format('webp').auto('format').url()}
      alt={imageAlt || ''}
      className={twMerge(
        clsx(
          'object-cover rounded-lg relative min-w-full',
          variant === 'textOnTop' && 'min-h-full',
          className,
        ),
      )}
      width={variant === 'default' ? 400 : undefined}
      height={variant === 'default' ? 400 : undefined}
      fill={variant === 'textOnTop'}
      loading="lazy"
      sizes="(max-width: 1000px) 100vw, 66vw"
    />
  );
};

const Marquee = () => {
  return (
    <div
      className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-brand-success-300 px-2 py-1 rounded-2xl font-semibold uppercase overflow-x-hidden w-32"
      aria-hidden="true"
    >
      <div className="flex gap-x-4 animate-marquee">
        <p className="shrink-0">Read Article</p>
        <p className="shrink-0">Read Article</p>
        <p className="shrink-0">Read Article</p>
      </div>
    </div>
  );
};

const BlogCard = ({
  className,
  media,
  category,
  author,
  title,
  excerpt,
  variant = 'default',
  href,
}: BlogCardProps) => {
  return (
    <Link href={`/blogs/${href}`} className={twMerge(clsx('group', className))}>
      {variant === 'default' && (
        <div className="flex flex-col gap-y-3 max-w-100">
          <div className="overflow-hidden relative">
            <BlogImage
              imageUrl={media.imageUrl}
              imageAlt={media.imageAlt}
              variant="default"
            />

            <Marquee />
          </div>

          <div className="flex flex-col gap-y-1 p-2">
            <div
              className={clsx(
                'flex items-center gap-x-2 text-fs-300',
                variant === 'default' && 'flex-col items-start gap-y-1',
              )}
            >
              <Banner>{formatTitle(category)}</Banner>
              <Banner>{formatTitle(author)}</Banner>
            </div>
            <h4 className="font-semibold capitalize text-fs-500">{title}</h4>
            <p>{excerpt}</p>
          </div>
        </div>
      )}

      {variant === 'textOnTop' && (
        <div className="flex flex-col gap-y-3 justify-end relative min-h-200 text-neutral-50">
          <div className="absolute inset-0 overflow-hidden">
            <BlogImage
              variant="textOnTop"
              imageAlt={media.imageAlt}
              imageUrl={media.imageUrl}
            />
          </div>

          <Marquee />

          <div className="flex flex-col gap-y-3 p-2 relative bg-black-gradient pb-10 px-10">
            <h4 className="font-semibold capitalize text-fs-700">{title}</h4>
            <div className="flex justify-between items-center">
              <Banner className="text-brand-neutral-50 border-brand-neutral-50">
                {formatTitle(category)}
              </Banner>
              <Banner className="text-brand-neutral-50 border-brand-neutral-50">
                {formatTitle(author)}
              </Banner>
            </div>
            <p>{excerpt}</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
