'use client';

import { handleUserForm } from '@/actions/handleUserInfoForm';
import Form from 'next/form';
import { Input } from '../ui/input';
import { useActionState, useEffect } from 'react';
import { InitialFormState } from '@/lib/dataAccessLayer';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

type UserInfoForm = {
  firstName: string;
  lastName: string;
  email: string;
};

const UserInfoForm = ({ firstName, lastName, email }: UserInfoForm) => {
  const [state, actionFunction] = useActionState(
    handleUserForm,
    InitialFormState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <Form
      action={actionFunction}
      className="grid md:grid-cols-2 md:gap-x-6 gap-y-4"
    >
      <div className="space-y-2">
        <label htmlFor="firstName" className="block font-semibold">
          First Name
        </label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue={firstName}
        />
        {!state.success && state.field === 'firstName' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="lastName" className="block font-semibold">
          Last Name
        </label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={lastName}
        />
        {!state.success && state.field === 'lastName' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-2 md:col-span-full">
        <label htmlFor="email" className="block">
          Email
        </label>
        <Input type="email" id="email" name="email" defaultValue={email} />
        {!state.success && state.field === 'email' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <SubmitButton label="Update" className="block" />
    </Form>
  );
};

export default UserInfoForm;
