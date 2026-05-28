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
      <div className="overflow-hidden relative aspect-square">
        <Image
          src={urlFor(media.imageUrl).format('webp').url()}
          alt={media.imageAlt}
          fill
          className="object-cover rounded-lg w-full"
          loading="lazy"
          sizes="(max-width: 300px) 100vw, 78vw"
        />
      </div>

      <p className="font-semibold text-center">{name}</p>
    </Link>
  );
};
