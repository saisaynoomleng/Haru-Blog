import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Padding = 'none' | 'sm' | 'md' | 'lg';

type BoundedProps = {
  as?: 'section' | 'main';
  className?: string;
  children: React.ReactNode;
  padding?: Padding;
  isCentered?: boolean;
};

const paddingSize: Record<Padding, string> = {
  none: '',
  sm: 'px-5 md:px-8 lg:px-12',
  md: 'px-8 md:px-10 lg:px-16',
  lg: 'px-10 md:px-12 lg:px-20',
};

const Bounded = ({
  as: Comp = 'section',
  className,
  children,
  padding = 'md',
  isCentered = true,
}: BoundedProps) => {
  return (
    <Comp
      className={twMerge(
        clsx(
          'space-y-8 md:space-y-10 lg:space-y-12 min-h-screen py-4 md:py-6',
          paddingSize[padding],
          isCentered && 'mx-auto max-w-7xl w-full',
          className,
        ),
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
