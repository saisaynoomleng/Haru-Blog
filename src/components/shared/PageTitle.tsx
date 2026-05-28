import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type PageTitleProps = {
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
  label: string;
};

const PageTitle = ({ as: Comp = 'h3', className, label }: PageTitleProps) => {
  return (
    <Comp
      className={twMerge(
        clsx('font-bold text-fs-600 fonts-sans md:text-fs-700 capitalize'),
        className,
      )}
    >
      {label}
    </Comp>
  );
};

export default PageTitle;
