import Bounded from '@/components/shared/Bounded';
import UserNav from '@/components/users/UserNav';
import React from 'react';

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Bounded as="main" className="grid md:grid-cols-[auto_1fr] md:gap-x-12">
      <UserNav />
      <div className="md:border-l border-brand-primary-950/20">{children}</div>
    </Bounded>
  );
};

export default UserLayout;
