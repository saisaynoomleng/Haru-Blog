import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ScrollIndicator } from './ScrollIndicator';
import { CallToAction } from './CallToAction';

type Media = {
  imageUrl: string;
  imageAlt: string;
};

type Action = {
  label: string;
  href: string;
};

type HeroProps = {
  variant?: 'default' | 'paperTexture' | 'categorize';
  className?: string;
  media: Media;
  title: string;
  eyebrow?: string;
  description: string;
  action: Action;
  scrollIndicator?: boolean;
  category?: string;
};

const HeroImage = ({ imageUrl, imageAlt }: Media) => {
  return (
    <div className={clsx('absolute inset-0')}>
      <Image
        src={urlFor(imageUrl).format('webp').auto('format').url()}
        alt={imageAlt || ''}
        fill
        className="object-cover w-full rounded-lg saturate-0 brightness-75"
        loading="eager"
        sizes="(max-width: 1000px) 100vw, 66vw"
      />
    </div>
  );
};

export const Hero = ({
  variant = 'default',
  className,
  media,
  title,
  eyebrow,
  description,
  action,
  scrollIndicator,
  category,
}: HeroProps) => {
  if (variant === 'paperTexture') {
    return (
      <div
        className={twMerge(
          clsx('relative min-h-[90dvh] p-4 md:p-10', className),
        )}
      >
        <HeroImage imageAlt={media.imageAlt} imageUrl={media.imageUrl} />

        <div className="flex flex-col p-10 gap-y-10 md:max-w-[50%] bg-paper-texture relative">
          <h2 className="font-bold relative text-fs-600 md:text-fs-700">
            {title}
          </h2>
          <p>{description}</p>
          <CallToAction
            label={action.label}
            href={action.href}
            className="self-start"
          />
        </div>
      </div>
    );
  }

  if (variant === 'categorize') {
    return (
      <div
        className={twMerge(
          clsx(
            'relative min-h-[90dvh] flex flex-col justify-between gap-y-10 p-4 md:p-10',
            className,
          ),
        )}
      >
        <HeroImage imageAlt={media.imageAlt} imageUrl={media.imageUrl} />

        {category && (
          <p className="uppercase text-neutral-50 relative">{category}</p>
        )}

        <div className="space-y-3">
          <h2 className="font-bold relative text-fs-600 md:text-fs-700 text-neutral-50">
            {title}
          </h2>

          <div className="flex flex-col p-10 gap-y-10 md:max-w-[50%] bg-paper-texture relative">
            <p>{description}</p>
            <CallToAction
              label={action.label}
              href={action.href}
              className="self-start"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        clsx(
          'grid md:grid-cols-[2fr_1fr] md:gap-x-5 gap-y-3 min-h-[90dvh] shadow-sm p-4 md:p-0 md:shadow-none',
          className,
        ),
      )}
    >
      <div className="flex flex-col justify-between p-5 relative text-neutral-50 max-md:min-h-[90dvh]">
        <HeroImage imageAlt={media.imageAlt} imageUrl={media.imageUrl} />
        <h2 className="font-bold relative text-fs-600 md:text-fs-700">
          {title}
        </h2>
        {scrollIndicator && (
          <ScrollIndicator label="Scroll Down" className="relative" />
        )}
      </div>
      <div className="flex flex-col gap-y-3 justify-between pt-20">
        <p className="text-fs-1000 font-black writing-vertical self-center uppercase">
          {eyebrow}
        </p>
        <p>{description}</p>
        <CallToAction label={action.label} href={action.href} />
      </div>
    </div>
  );
};
