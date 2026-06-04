import MembershipForm from '@/components/features/MembershipForm';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { formatCurrency } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { MEMBERSHIP_QUERY } from '@/sanity/lib/queries';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

const MembershipDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: product } = await sanityFetch({
    query: MEMBERSHIP_QUERY,
    params: await params,
  });
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  if (!product) notFound();

  const {
    name,
    pricePerMonth,
    imageAlt,
    imageUrl,
    desc,
    features,
    slug,
    _id,
    stripePriceId,
  } = product;

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <PageTitle label={name || ''} />
      </Bounded>

      <Bounded padding="none" className="grid md:grid-cols-2 gap-6">
        <div className="overflow-hidden relative aspect-square rounded-lg">
          {imageAlt && imageUrl && (
            <Image
              src={urlFor(imageUrl).format('webp').url()}
              alt={imageAlt || ''}
              fill
              sizes="(max-width: 600px) 100vw, 88vw"
              loading="lazy"
              className="object-cover w-full rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col gap-y-4">
          <p className="font-semibold">Price: </p>
          {pricePerMonth && <p>{formatCurrency(pricePerMonth)}/month</p>}

          <div className="divider"></div>

          <p className="font-semibold">Description: </p>
          <p>{desc}</p>

          <div className="divider"></div>

          <p className="font-semibold">Features</p>
          <ul className="flex flex-col gap-y-3">
            {features?.map((feature, i) => (
              <li
                key={i}
                className='relative before:absolute before:content-["✓"] pl-5 before:left-0 capitalize font-semibold'
              >
                {feature}
              </li>
            ))}
          </ul>

          <MembershipForm
            name={name as string}
            _id={_id as string}
            stripePriceId={stripePriceId as string}
          />
        </div>
      </Bounded>
    </Bounded>
  );
};

export default MembershipDetailPage;
