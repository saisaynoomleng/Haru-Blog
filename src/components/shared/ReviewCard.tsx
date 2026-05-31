import { formatDate } from '@/lib/formatter';
import clsx from 'clsx';
import { PiStarFourFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';

type ReviewCardProps = {
  username: string;
  className?: string;
  rating: number;
  reviewedAt: Date | string;
  body: string;
  title: string;
  role: string;
};

export const ReviewCard = ({
  className,
  rating,
  username,
  reviewedAt,
  title,
  role,
  body,
}: ReviewCardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col gap-y-2 max-w-100 shadow p-2 bg-brand-neutral-50',
          className,
        ),
      )}
    >
      <div className="flex gap-x-1">
        {Array.from({ length: rating }, (_, i) => (
          <PiStarFourFill key={i} className="text-brand-primary-700" />
        ))}
      </div>
      <p className="font-semibold">{title}</p>
      <div className="justify-between flex text-brand-primary-950/30 text-fs-300">
        <p className=" italic">by {username}</p>
        {reviewedAt && <p>{formatDate(reviewedAt)}</p>}
      </div>
      <p className="text-brand-primary-700">{role}</p>
      <p data-testid="body">{body}</p>
    </div>
  );
};
