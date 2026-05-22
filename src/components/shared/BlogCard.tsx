import { formatTitle } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
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
};

const BlogCard = ({
  className,
  media,
  category,
  author,
  title,
  excerpt,
}: BlogCardProps) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-y-3', className))}>
      <div className="overflow-hidden relative">
        <Image
          src={urlFor(media.imageUrl).format('webp').auto('format').url()}
          alt={media.imageAlt || ''}
          fill
          className="object-cover rounded-sm relative"
        />

        <p className="abosolute left-0 bottom-0 px-2 py-1 border">
          {formatTitle(category)}
        </p>
        <p className="abosolute right-0 bottom-0 px-2 py-1 border">
          {formatTitle(author)}
        </p>
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="font-semibold capitalize">{title}</p>
        <p>{excerpt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
