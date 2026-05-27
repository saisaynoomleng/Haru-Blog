'use client';

import { handleNewsletter } from '@/actions/handleNewsletter';
import { InitialFormState } from '@/lib/dataLayer';
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
      className="space-y-8 bg-paper-texture p-5 mix-blend-multiply bg-brand-error-400"
    >
      <h3 className="font-semibold font-sans text-center text-fs-600 md:text-fs-700">
        Join Our Newsletter!
      </h3>

      <div className="space-y-1">
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

      <SubmitButton className="self-center w-25" />
    </Form>
  );
};

export default NewsletterSubscription;
