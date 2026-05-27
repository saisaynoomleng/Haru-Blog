'use client';

import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CallToAction } from './CallToAction';
import { PaperTorn } from './PaperTorn';
import { MEMBER_ACCESS_FEATURES_QUERY_RESULT } from '@/sanity/types';

type MemberAccessFeatureProps = {
  features: NonNullable<MEMBER_ACCESS_FEATURES_QUERY_RESULT>['memberAccessFeatures'];
  className?: string;
};

const defaultFeature = {
  title: 'Unlimited Article Access',
  body: 'Get unrestricted access to all premium blog posts. Stay updated with exclusive content that dives deep into fashion, beauty, and lifestyle insights just for you.',
  image: {
    imageAlt: 'model posing',
    imageUrl:
      'https://cdn.sanity.io/images/u19h5dbs/production/107029296c17d021c00b3cf3ef78fa515915e020-736x1051.jpg',
  },
};

const MemberAccessFeature = ({
  className,
  features,
}: MemberAccessFeatureProps) => {
  const [current, setCurrent] = useState<typeof defaultFeature>(defaultFeature);

  if (!features) return null;

  return (
    <div className={twMerge(clsx('grid md:grid-cols-2 md:gap-x-5', className))}>
      <PaperTorn className="overflow-hidden p-5">
        <Image
          src={urlFor(current.image.imageUrl).format('webp').url()}
          alt={current.image.imageAlt}
          width={400}
          height={600}
          sizes="(max-width: 200px)"
          className="object-cover rounded-sm saturate-0  max-h-125"
        />
      </PaperTorn>

      <div className={clsx('flex flex-col gap-y-3')}>
        {features.map((f, i) => (
          <div
            onMouseEnter={() => setCurrent(f as typeof defaultFeature)}
            onMouseLeave={() => setCurrent(defaultFeature)}
            key={i}
            className={clsx(
              'space-y-3',
              current.title === f.title &&
                'border-l-4 pl-4 border-brand-primary-600',
            )}
          >
            <p className="font-semibold text-fs-500">{f.title}</p>
            <p className="text-brand-neutral-500">{f.body}</p>
          </div>
        ))}
        <CallToAction label="view pricing" href="/memberships" />
      </div>
    </div>
  );
};

export default MemberAccessFeature;
