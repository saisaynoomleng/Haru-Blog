import clsx from 'clsx';
import { RxArrowDown } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

type ScrollIndicatorProp = {
  className?: string;
  label: string;
};

export const ScrollIndicator = ({ className, label }: ScrollIndicatorProp) => {
  return (
    <div
      className={twMerge(clsx('flex gap-x-4 text-brand-neutral-50', className))}
    >
      <span className="bg-neutral-50 text-brand-neutral-950! animate-bounce p-2 rounded-full">
        <RxArrowDown data-testid="bounce indicator" />
      </span>
      <span className="text-fs-300">{label}</span>
    </div>
  );
};
