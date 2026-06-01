import { sanityFetch } from '@/sanity/lib/live';
import { HEADER_QUERY } from '@/sanity/lib/queries';
import DesktopNav from './DesktopNav';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { HEADER_QUERY_RESULT } from '@/sanity/types';
import { auth } from '@clerk/nextjs/server';
import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { eq } from 'drizzle-orm';

const Header = async () => {
  const { data: header } = await sanityFetch({ query: HEADER_QUERY });
  const { userId } = await auth();

  const user =
    userId &&
    (await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkUserId, userId),
      columns: {
        imageUrl: true,
      },
    }));

  const userImage = user && user.imageUrl;

  if (!header) return null;

  return (
    <header className=" mx-auto max-w-7xl w-full px-8 md:px-10 lg:px-16 py-4 flex justify-between items-center shadow-lg">
      <Link href="/">
        {header.logoUrl && (
          <Image
            src={urlFor(header.logoUrl).format('webp').url()}
            width={100}
            height={50}
            alt={header.logoAlt || ''}
            loading="lazy"
            className="w-10"
          />
        )}
      </Link>

      {/* desktop-nav */}
      <DesktopNav
        navigation={
          header.navigation as NonNullable<HEADER_QUERY_RESULT>['navigation']
        }
        socialLinks={
          header.socialLinks as NonNullable<HEADER_QUERY_RESULT>['socialLinks']
        }
        className="hidden md:flex"
        userImage={userImage || ''}
      />

      {/* mobile-nav */}
      <MobileNav
        navigation={
          header.navigation as NonNullable<HEADER_QUERY_RESULT>['navigation']
        }
        socialLinks={
          header.socialLinks as NonNullable<HEADER_QUERY_RESULT>['socialLinks']
        }
        className="flex md:hidden"
        userImage={userImage || ''}
      />
    </header>
  );
};

export default Header;
