'use client';

import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const { signIn, errors } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [customError, setCustomError] = useState<{ password: string }>({
    password: '',
  });

  const handleSendCode = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await signIn.create({
        identifier: email,
      });

      await signIn.resetPasswordEmailCode.sendCode();
      setCodeSent(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerifyCode = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleNewPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setCustomError({ password: 'Password not match' });
        return;
      }

      await signIn.resetPasswordEmailCode.submitPassword({
        password,
        signOutOfOtherSessions: true,
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
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded as="main" className="grid md:grid-cols-2 md:gap-x-12">
      <Bounded padding="none" className="max-md:hidden">
        <div className="overflow-hidden">
          <Image
            src="/forgot-password.jpg"
            alt=""
            loading="eager"
            width={600}
            height={800}
            className="rounded-lg saturate-0"
          />
        </div>
      </Bounded>

      <Bounded padding="none">
        {!codeSent && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <PageTitle label="Reset Password" />
            <div className="space-y-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                required
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.fields.identifier && (
                <p className="form-error-message">
                  {errors.fields.identifier.message}
                </p>
              )}
            </div>

            <Button>Send Code</Button>
          </form>
        )}

        {codeSent && signIn.status !== 'needs_new_password' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <PageTitle label="Enter Reset Code" />

            <p>
              We&apos;ve sent a reset code to{' '}
              <span className="font-semibold">{email}</span>
            </p>

            <div className="space-y-2">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <Input
                type="number"
                id="code"
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.fields.code && (
                <p className="form-error-message">
                  {errors.fields.code.message}
                </p>
              )}
            </div>

            <Button>Verify Code</Button>
          </form>
        )}

        {signIn.status === 'needs_new_password' && (
          <form onSubmit={handleNewPassword} className="space-y-6">
            <PageTitle label="Enter New password" />

            <div className="space-y-2">
              <label htmlFor="password" className="form-label">
                Enter New Password
              </label>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.fields.password && (
                <p className="form-error-message">
                  {errors.fields.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassowrd">Confirm New Password</label>
              <Input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {customError.password && (
                <p className="form-error-message">{customError.password}</p>
              )}
            </div>

            <Button>Submit</Button>
          </form>
        )}
      </Bounded>
    </Bounded>
  );
};

export default ForgotPasswordPage;
