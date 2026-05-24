import { formatCurrency } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { CallToAction } from './CallToAction';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Media = {
  imageUrl: string;
  imageAlt: string;
};

type ProductCardProps = {
  name: string;
  slug: string;
  price: number;
  body: string;
  features: string[];
  media: Media;
  isFeatured: boolean;
  className?: string;
};

export const ProductCard = ({
  name,
  slug,
  price,
  body,
  features,
  media,
  isFeatured,
  className,
}: ProductCardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col p-2 gap-y-2 md:gap-y-4 border rounded-lg max-w-100 group hover:-translate-y-1 transition-all duration-200 ease-in-out pb-5',
          isFeatured && 'border-brand-primary-700 border-2',
          className,
        ),
      )}
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          src={urlFor(media.imageUrl).format('webp').url()}
          width={400}
          height={400}
          alt={media.imageAlt}
          loading="lazy"
          className="object-cover rouded-lg"
        />
      </div>

      <h2 className="font-semibold text-fs-500">{name}</h2>

      <p>
        <span className="font-medium" data-testid="price">
          {formatCurrency(price)}
        </span>
        /month
      </p>

      <div className="divider" />

      <p data-testid="body">{body}</p>

      <div className="flex gap-x-5 items-center">
        <div className="divider" />

        <p className="font-semibold">Features</p>

        <div className="divider" />
      </div>

      <ul>
        {features.map((feature, i) => (
          <li
            className='relative before:absolute before:content-["✓"] pl-5 before:left-0 capitalize font-semibold'
            key={i}
          >
            {feature}
          </li>
        ))}
      </ul>

      <CallToAction href={`/memberships/${slug}`} label="Subscribe" />
    </div>
  );
};
