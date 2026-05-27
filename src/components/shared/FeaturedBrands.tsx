import { twMerge } from 'tailwind-merge';
import Bounded from './Bounded';
import clsx from 'clsx';
import { FEATURED_BRANDS_QUERY_RESULT } from '@/sanity/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type FeaturedBrandsProps = {
  className?: string;
  brands: NonNullable<FEATURED_BRANDS_QUERY_RESULT>['featuredBrand'];
};

const FeaturedBrands = async ({ className, brands }: FeaturedBrandsProps) => {
  return (
    <div className={twMerge(clsx('space-y-10'))}>
      <h3 className="font-semibold text-fs-600 text-center text-brand-neutral-900/50">
        Featured Brands
      </h3>
      <div className="flex items-center justify-around gap-x-5 overflow-hidden">
        {brands?.map((b) => (
          <Image
            key={b._key}
            src={urlFor(b.imageUrl as string)
              .format('webp')
              .url()}
            alt={b.imageAlt || ''}
            width={100}
            height={50}
            loading="lazy"
            className="object-cover "
            sizes="(max-width:50px)"
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrands;
