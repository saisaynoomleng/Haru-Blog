'use client';

import { socialIcons } from '@/lib/dataLayer';
import { HEADER_QUERY_RESULT } from '@/sanity/types';
import { useAuth, UserButton } from '@clerk/nextjs';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCloseFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

type MobileNavProps = {
  navigation: NonNullable<HEADER_QUERY_RESULT>['navigation'];
  socialLinks: NonNullable<HEADER_QUERY_RESULT>['socialLinks'];
  className?: string;
};

const MobileNav = ({ navigation, socialLinks, className }: MobileNavProps) => {
  const { userId } = useAuth();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const dropdown = navigation?.find((item) => item._type == 'navDropdown');
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  return (
    <nav className={twMerge(clsx('gap-x-3 items-center', className))}>
      {userId && <UserButton />}

      <button
        aria-label="navigation toggle button"
        onClick={() => setNavOpen((open) => !open)}
        className="relative z-50 cursor-pointer"
      >
        {navOpen ? (
          <span>
            <RiCloseFill size={30} />
          </span>
        ) : (
          <span>
            <GiHamburgerMenu size={30} />
          </span>
        )}
      </button>

      <div
        className={twMerge(
          clsx(
            'flex flex-col gap-y-1 font-sans font-semibold text-fs-500 bg-paper-texture transition-transform duration-200 fixed inset-0 z-40 p-10 uppercase',
            navOpen ? 'translate-y-0' : '-translate-y-full',
          ),
        )}
      >
        <div className="space-y-3">
          <p className="font-bold text-fs-600 text-brand-primary-800">Topic</p>
          <ul className="flex flex-col gap-y-3">
            {navigation?.map((nav) => {
              if (nav._type === 'navLink' && !nav.isButton) {
                return (
                  <li key={nav.href}>
                    <Link
                      key={nav.href}
                      href={nav.href as string}
                      className={clsx(
                        'px-2 hover:bg-brand-primary-100 rounded-sm',
                        pathname === nav.href &&
                          'font-semibold bg-brand-primary-300',
                      )}
                      onClick={() => setNavOpen(false)}
                    >
                      {nav.label}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="divider" />

        <div className="space-y-3">
          <p className="font-bold text-fs-600 text-brand-primary-800">Sites</p>
          <ul className="gap-y-3 flex flex-col">
            {dropdown?.dropdownItems?.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href as string}
                  className="hover:underline underline-offset-4 decoration-brand-primary-600"
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="divider" />

        <div className="space-y-3">
          <p className="font-bold text-fs-600 text-brand-primary-800">
            Social Links
          </p>
          <ul className="flex gap-x-5 items-center self-end">
            {socialLinks?.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.url as string}
                  className="hover:text-brand-primary-600"
                >
                  {socialIcons[link.platform as string]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
