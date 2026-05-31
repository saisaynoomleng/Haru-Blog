'use client';

import { handleContactForm } from '@/actions/handleContactForm';
import { InitialFormState } from '@/lib/dataAccessLayer';
import Form from 'next/form';
import { useActionState, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

const MAX_MESSAGE_LENGTH = 1000;

const ContactUsForm = () => {
  const [state, actionFunction] = useActionState(
    handleContactForm,
    InitialFormState,
  );
  const [messageLength, setMessageLength] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
      setMessageLength(0);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <Form
      ref={formRef}
      action={actionFunction}
      className="space-y-3"
      role="form"
    >
      <div className="space-y-1">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <Input name="name" id="name" type="text" autoComplete="name" />
        {!state.success && state.field === 'name' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Input type="email" name="email" id="email" autoComplete="email" />
        {!state.success && state.field === 'email' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <Input type="text" name="subject" id="subject" />
        {!state.success && state.field === 'subject' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(e) => setMessageLength(e.target.value.length)}
        ></Textarea>
        <p className="text-right">{messageLength}/1000</p>
        {!state.success && state.field === 'message' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton />
    </Form>
  );
};

export default ContactUsForm;
