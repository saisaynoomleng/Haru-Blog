import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { sanityFetch } from '@/sanity/lib/live';
import { REVIEWS_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const ReviewsPage = async () => {
  const { data: reviews } = await sanityFetch({ query: REVIEWS_QUERY });

  if (!reviews) notFound();

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <PageTitle
          label="what our cutsomers say"
          className="font-sans capitalize"
        />
      </Bounded>

      <Bounded padding="none" className="columns-1 md:columns-2">
        {reviews.map((review) => (
          <div key={review._id} className="break-inside-avoid">
            <Suspense>
              <ReviewCard
                reviewedAt={review.reviewedAt as string}
                role={review.role || ''}
                body={review.body || ''}
                title={review.title || ''}
                username={review.username || ''}
                rating={review.rating || 0}
              />
            </Suspense>
          </div>
        ))}
      </Bounded>
    </Bounded>
  );
};

export default ReviewsPage;
