'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loading } from './Loading';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const SubmitButton = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={twMerge(
        clsx(
          'bg-brand-success-300 text-shadow-brand-neutral-950 uppercase hover:bg-brand-success-400 rounded-2xl! cursor-pointer min-w-25',
          className,
        ),
      )}
    >
      {pending ? <Loading /> : <span>Submit</span>}
    </Button>
  );
};

export default SubmitButton;
