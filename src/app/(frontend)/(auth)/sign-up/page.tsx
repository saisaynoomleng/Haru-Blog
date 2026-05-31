'use client';

import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { OAuthStrategy } from '@clerk/nextjs/types';
import { OAuthLogins } from '@/lib/dataAccessLayer';

const SignUpPage = () => {
  const { signUp, errors } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [emailCode, setEmailCode] = useState<boolean>(false);
  const [customErrors, setCustomErrors] = useState<{ message: string }>({
    message: '',
  });
  const [check, setCheck] = useState<boolean>(false);

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setCustomErrors({ message: 'Passwords must match' });
        return;
      }

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.verifications.sendEmailCode();
      setEmailCode(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      console.log('Clerk errors', errors);
    }
  };

  const handleCode = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      signUp.verifications.verifyEmailCode({ code });

      if (signUp.status === 'complete') {
        await signUp.finalize({
          navigate: async ({ session, decorateUrl }) => {
            if (session.currentTask) {
              console.log(session.currentTask);
              return;
            }

            const url = decorateUrl('/');
            router.push(url);
          },
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleResendCode = async () => {
    await signUp.verifications.sendEmailCode();
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
      <div className="overflow-hidden rounded-lg max-md:hidden">
        <Image
          src="/signup.jpg"
          alt=""
          width={400}
          height={600}
          className="object-cover rounded-lg w-full saturate-0"
        />
      </div>
      {emailCode ? (
        <Bounded padding="none">
          <PageTitle label="Verify Code" />

          <form onSubmit={handleCode} className="flex flex-col gap-y-6">
            <p>
              We&apos;ve sent verification code to{' '}
              <span className="font-semibold">{email}</span>
            </p>
            <div className="space-y-1">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <Input
                type="number"
                id="code"
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="button"
                className="ml-auto block text-brand-primary-600 cursor-pointer hover:underline"
                onClick={handleResendCode}
              >
                Resend Code
              </button>
            </div>

            <Button>Verify</Button>

            <div id="clerk-captcha" />
          </form>
        </Bounded>
      ) : (
        <Bounded padding="none">
          <PageTitle label="Sign Up" />
          <div id="clerk-captcha" />

          <div className="flex justify-between items-center">
            {OAuthLogins.map((login, i) => (
              <Button
                type="button"
                key={i}
                onClick={() => handleOAuth(login.name as OAuthStrategy)}
              >
                {login.label}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-y-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                id="email"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1 relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Input
                type={viewPassword ? 'text' : 'password'}
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-1 top-[50%]">
                {viewPassword ? (
                  <LuEyeClosed
                    onClick={() => setViewPassword((prev) => !prev)}
                  />
                ) : (
                  <LuEye onClick={() => setViewPassword((prev) => !prev)} />
                )}
              </span>
              {customErrors.message && (
                <p className="form-error-message">{customErrors.message}</p>
              )}
            </div>

            <div className="space-y-1 relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Input
                type={viewConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="absolute right-1 top-[50%]">
                {viewConfirmPassword ? (
                  <LuEyeClosed
                    onClick={() => setViewConfirmPassword((prev) => !prev)}
                  />
                ) : (
                  <LuEye
                    onClick={() => setViewConfirmPassword((prev) => !prev)}
                  />
                )}
              </span>
              {customErrors.message && (
                <p className="form-error-message">{customErrors.message}</p>
              )}
            </div>

            <div className="flex items-center gap-x-2">
              <Checkbox
                id="check"
                checked={check}
                onCheckedChange={(checked) => setCheck(!!checked)}
              />

              <label htmlFor="check">Agree to our </label>

              <Link href="/utility-pages/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </div>

            <Button disabled={!check}>Sign Up</Button>

            <p>
              Already a member?{' '}
              <Link href="/sign-in" className="underline">
                Sign In
              </Link>
            </p>
            <div id="clerk-captcha" />
          </form>
        </Bounded>
      )}
    </Bounded>
  );
};

export default SignUpPage;
