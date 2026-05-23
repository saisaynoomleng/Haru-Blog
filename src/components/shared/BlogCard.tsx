import { formatTitle } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
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
  excerpt: string;
  href: string;
  variant?: 'default' | 'textOnTop';
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
            <Image
              src={urlFor(media.imageUrl).format('webp').auto('format').url()}
              alt={media.imageAlt || ''}
              className="object-cover rounded-lg relative min-w-full"
              width={400}
              height={400}
            />

            <p className="absolute left-2 font-semibold bottom-3 px-2 py-1 border text-neutral-50 rounded-2xl uppercase">
              {formatTitle(category)}
            </p>
            <p className="absolute right-2 font-semibold bottom-3 px-2 py-1 border text-neutral-50 rounded-2xl uppercase">
              {formatTitle(author)}
            </p>

            <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-brand-success-300 px-2 py-1 rounded-2xl font-semibold uppercase overflow-x-hidden w-30">
              <div className="flex gap-x-4 animate-marquee">
                <p className="shrink-0">Read Article</p>
                <p className="shrink-0">Read Article</p>
                <p className="shrink-0">Read Article</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-1 p-2">
            <h4 className="font-semibold capitalize text-fs-500">{title}</h4>
            <p>{excerpt}</p>
          </div>
        </div>
      )}

      {variant === 'textOnTop' && (
        <div className="flex flex-col gap-y-3 justify-end relative min-h-200 text-neutral-50 pb-10">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={urlFor(media.imageUrl).format('webp').auto('format').url()}
              alt={media.imageAlt || ''}
              className="object-cover rounded-lg relative min-w-full min-h-full"
              fill
            />
          </div>

          <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-brand-success-300 text-brand-neutral-950 px-2 py-1 rounded-2xl font-semibold uppercase overflow-x-hidden w-30">
            <div className="flex gap-x-4 animate-marquee">
              <p className="shrink-0">Read Article</p>
              <p className="shrink-0">Read Article</p>
              <p className="shrink-0">Read Article</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 p-2 relative">
            <h4 className="font-semibold capitalize text-fs-700">{title}</h4>
            <div className="flex justify-between items-center">
              <p className="font-semibold bottom-3 px-2 py-1 border text-neutral-50 rounded-2xl uppercase">
                {formatTitle(category)}
              </p>
              <p className="font-semibold bottom-3 px-2 py-1 border text-neutral-50 rounded-2xl uppercase">
                {formatTitle(author)}
              </p>
            </div>
            <p>{excerpt}</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
