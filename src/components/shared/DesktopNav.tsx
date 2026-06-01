'use client';

import { HEADER_QUERY_RESULT } from '@/sanity/types';
import { useAuth } from '@clerk/nextjs';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { twMerge } from 'tailwind-merge';
import { RiCloseFill } from 'react-icons/ri';
import { socialIcons } from '@/lib/dataAccessLayer';
import Image from 'next/image';

type DesktopNavProps = {
  navigation: NonNullable<HEADER_QUERY_RESULT>['navigation'];
  socialLinks: NonNullable<HEADER_QUERY_RESULT>['socialLinks'];
  className?: string;
  userImage?: string;
};

const DesktopNav = ({
  navigation,
  socialLinks,
  className,
  userImage,
}: DesktopNavProps) => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { isSignedIn } = useAuth();
  const dropdown = navigation?.find((item) => item._type === 'navDropdown');

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  return (
    <nav
      role="navigation"
      className={twMerge(clsx('gap-x-3 items-center', className))}
    >
      {navigation?.map((nav) => {
        if (nav._type === 'navLink' && !nav.isButton) {
          return (
            <Link
              key={nav.href}
              href={nav.href as string}
              className={clsx(
                'px-2 hover:bg-brand-primary-100 rounded-sm',
                pathname === nav.href && 'font-semibold bg-brand-primary-300',
              )}
            >
              {nav.label}
            </Link>
          );
        }
      })}

      {isSignedIn ? (
        <Link
          href="/user"
          className="overflow-hidden relative aspect-square w-10 h-10"
        >
          <Image
            src={userImage || 'https://placehold.co/100.png'}
            alt=""
            fill
            loading="lazy"
            className="max-w-10 rounded-full"
            sizes="(max-width:40px) 10vw, 6vw"
          />
        </Link>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}

      <div className="flex items-center">
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
              'flex flex-col gap-y-1 font-sans font-semibold text-fs-800 bg-paper-texture transition-transform duration-200 fixed inset-0 z-40 p-10 uppercase',
              navOpen ? 'translate-y-0' : '-translate-y-full',
            ),
          )}
        >
          <ul>
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

export default DesktopNav;
