import UserInfoForm from '@/components/features/UserInfoForm';
import UserPhotoForm from '@/components/features/UserPhotoForm';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

const UserPage = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn;

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
    columns: {
      firstName: true,
      lastName: true,
      email: true,
      imageUrl: true,
    },
  });

  if (!user) return null;

  return (
    <Bounded className="min-h-screen">
      <Bounded padding="none">
        <PageTitle label="Update User Info" />

        {user.imageUrl && <UserPhotoForm imageUrl={user.imageUrl} />}

        {user.firstName && user.lastName && user.email && (
          <UserInfoForm
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />
        )}
      </Bounded>
    </Bounded>
  );
};

export default UserPage;
