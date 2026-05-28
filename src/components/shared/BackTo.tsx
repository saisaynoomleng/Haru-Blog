import clsx from 'clsx';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type BackToProps = {
  className?: string;
  label: string;
  href: string;
};

const BackTo = ({ className, href, label }: BackToProps) => {
  return (
    <Link
      href={`${href.toLowerCase()}`}
      className={twMerge(clsx('flex items-center gap-x-3 group', className))}
    >
      <FaArrowLeftLong className="group-hover:-translate-x-2 transition-transform duration-200" />
      <span className="group-hover:underline">Back to all {label}</span>
    </Link>
  );
};

export default BackTo;
