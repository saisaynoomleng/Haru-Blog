'use client';

import { handleReviewForm } from '@/actions/handleReviewForm';
import { InitialFormState } from '@/lib/dataAccessLayer';
import clsx from 'clsx';
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

const ReviewForm = ({ className }: { className?: string }) => {
  const [state, actionFunction] = useActionState(
    handleReviewForm,
    InitialFormState,
  );
  const [messageLength, setMessageLength] = useState<number>(0);

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
      className={twMerge(clsx('flex flex-col gap-y-6'))}
    >
      <div className="space-y-1">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <Input type="text" id="title" name="title" />
        {!state.success && state.field == 'title' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="username" className="form-label">
          Name
        </label>
        <Input type="text" id="username" name="username" autoComplete="name" />
        {!state.success && state.field == 'username' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="role" className="form-label">
          Role (position)
        </label>
        <Input type="text" id="role" name="role" />
        {!state.success && state.field == 'role' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <Input type="number" min={1} max={5} id="rating" name="rating" />
        {!state.success && state.field == 'rating' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="body" className="form-label">
          Text
        </label>
        <Textarea
          id="body"
          name="body"
          onChange={(e) => setMessageLength(e.target.value.length)}
        />
        <p className="text-right">{messageLength}/1000</p>
        {!state.success && state.field == 'body' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton className="self-start" />
    </Form>
  );
};

export default ReviewForm;
