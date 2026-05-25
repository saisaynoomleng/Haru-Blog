import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Media = {
  imageUrl: string;
  imageAlt: string;
};

type EditorCardProps = {
  className?: string;
  name: string;
  media: Media;
  href: string;
};

export const EditorCard = ({
  name,
  className,
  media,
  href,
}: EditorCardProps) => {
  return (
    <Link
      href={`/editors/${href}`}
      className={twMerge(clsx('flex flex-col gap-y-3', className))}
    >
      <div className="overflow-hidden">
        <Image
          src={urlFor(media.imageUrl).format('webp').url()}
          alt={media.imageAlt}
          width={200}
          height={400}
          className="object-cover rounded-lg"
        />
      </div>

      <p className="font-semibold text-center">{name}</p>
    </Link>
  );
};
