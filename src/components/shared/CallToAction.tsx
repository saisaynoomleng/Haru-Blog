import Link from 'next/link';
import { Button } from '../ui/button';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type CallToActionProps = {
  label: string;
  href: string;
  className?: string;
};

export const CallToAction = ({ label, href, className }: CallToActionProps) => {
  return (
    <Button asChild>
      <Link
        href={href}
        className={twMerge(
          clsx(
            'bg-brand-success-300 text-shadow-brand-neutral-950 tracking-wide uppercase hover:bg-brand-success-400 rounded-2xl!',
            className,
          ),
        )}
      >
        <span className="shrink-0">{label}</span>
      </Link>
    </Button>
  );
};
