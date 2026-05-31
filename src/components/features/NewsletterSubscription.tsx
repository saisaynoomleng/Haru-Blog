'use client';

import { handleNewsletter } from '@/actions/handleNewsletter';
import { InitialFormState } from '@/lib/dataAccessLayer';
import { useActionState, useEffect } from 'react';
import Form from 'next/form';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

const NewsletterSubscription = () => {
  const [state, actionFunction] = useActionState(
    handleNewsletter,
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
      className="bg-paper-texture p-5 py-20 mix-blend-multiply bg-brand-error-400 flex flex-col gap-y-8"
    >
      <h3 className="font-semibold font-sans text-center text-fs-600 md:text-fs-700">
        Join Our Newsletter!
      </h3>

      <div className="space-y-1 w-100 self-center">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          required
          name="email"
          id="email"
          placeholder="johndoe@example.com"
        />
        {!state.success && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton className="w-25 self-center" />
    </Form>
  );
};

export default NewsletterSubscription;
