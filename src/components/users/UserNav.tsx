'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'User Information', url: '/user' },
  { name: 'Membership Status', url: '/user/status' },
  { name: 'Payment History', url: '/user/payment-history' },
];

const UserNav = () => {
  const pathname = usePathname();
  return (
    <header>
      {/* desktop view */}
      <nav className="sticky  top-1 ">
        <ul className="flex flex-col justify-start gap-y-3">
          {LINKS.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                className={clsx(
                  'w-full block rounded-md px-4 py-2',
                  pathname === link.url
                    ? 'bg-brand-primary-700 text-brand-neutral-50 font-semibold'
                    : 'hover:bg-brand-primary-200',
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <SignOutButton>
              <button className="w-full bg-brand-error-900 text-brand-neutral-50 rounded-lg font-semibold">
                Sign Out
              </button>
            </SignOutButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserNav;
