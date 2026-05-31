import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type MemberCardProps = {
  media: Media;
  name: string;
  role: string;
  email: string;
  className?: string;
};

type Media = {
  imageUrl: string;
  imageAlt: string;
};

export const MemberCard = ({
  media,
  name,
  role,
  email,
  className,
}: MemberCardProps) => {
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-y-3 group md:h-100', className),
      )}
    >
      <div className="overflow-hidden">
        <Image
          src={urlFor(media.imageUrl).format('webp').url()}
          width={400}
          height={400}
          alt={media.imageAlt || ''}
          loading="lazy"
          className={clsx(
            'rounded-lg object-cover saturate-0 group-hover:saturate-100',
          )}
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="font-semibold">{name}</p>
        <div className="divider" />
        <p className="capitalize">{role}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};
