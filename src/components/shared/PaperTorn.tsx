import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type PaperTornProps = {
  className?: string;
  children: React.ReactNode;
};

const MASK_CLASS =
  '[mask-image:url(/torn.png)] [mask-mode:alpha] [mask-position:center] [mask-repeat:no-repeat] [mask-size:100%_100%]';

export const PaperTorn = ({ className, children }: PaperTornProps) => {
  return (
    <div className={twMerge(clsx('relative w-full h-full', className))}>
      <div className={clsx(MASK_CLASS, 'w-full h-full')}>{children}</div>
    </div>
  );
};
