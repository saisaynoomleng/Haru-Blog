'use client';

import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OAuthLogins } from '@/lib/dataAccessLayer';
import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/nextjs/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignInPage = () => {
  const { signIn, errors } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await signIn.password({
        emailAddress: email,
        password,
      });

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session.currentTask);
              return;
            }

            router.push(decorateUrl('/'));
          },
        });
      }
    } catch (error) {
      console.error('Clerk error', JSON.stringify(errors, null, 2));
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    try {
      await signIn.sso({
        strategy,
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/',
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded as="main" className="grid md:grid-cols-2 md:gap-x-12">
      <Bounded padding="none">
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/signin.jpg"
            alt=""
            loading="lazy"
            width={600}
            height={800}
            className="rounded-lg saturate-0"
          />
        </div>
      </Bounded>

      <Bounded padding="none">
        <PageTitle label="Sign In" />
        <div id="clerk-captcha" />

        <div className="flex justify-between items-center">
          {OAuthLogins.map((login, i) => (
            <Button
              type="button"
              variant="oAuth"
              key={i}
              onClick={() => handleOAuth(login.name as OAuthStrategy)}
            >
              {login.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          <div className="divider"></div>
          <p>Or</p>
          <div className="divider"></div>
        </div>

        <form className="flex flex-col gap-y-4" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input
              type="email"
              required
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.fields.identifier && (
              <p className="form-error-message">
                {errors.fields.identifier.message}
              </p>
            )}
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="password" className="form-lable">
              Password
            </label>
            <Input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.fields.password && (
              <p className="form-error-message">
                {errors.fields.password.message}
              </p>
            )}
          </div>

          <Button className="self-start">Sign In</Button>
          <p>
            Not a memeber yet?{' '}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Bounded>
    </Bounded>
  );
};

export default SignInPage;
