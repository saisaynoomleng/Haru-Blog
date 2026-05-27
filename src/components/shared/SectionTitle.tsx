import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CallToAction } from './CallToAction';

type SectionTitleProps = {
  label: string;
  className?: string;
  action: {
    label: string;
    href: string;
  };
};

const SectionTitle = ({ label, className, action }: SectionTitleProps) => {
  return (
    <div
      className={twMerge(clsx('flex justify-between items-center', className))}
    >
      <h3 className="uppercase font-semibold font-sans text-fs-600 md:text-fs-700 ">
        {label}
      </h3>
      <CallToAction href={action.href} label={action.label} />
    </div>
  );
};

export default SectionTitle;
