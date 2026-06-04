'use client';

import { handleSubscription } from '@/actions/handleSubscription';
import { InitialFormState } from '@/lib/dataAccessLayer';
import Form from 'next/form';
import { useActionState } from 'react';
import SubmitButton from '../shared/SubmitButton';

type MembershipFormProps = {
  name: string;
  stripePriceId: string;
  _id: string;
};

const MembershipForm = ({ name, stripePriceId, _id }: MembershipFormProps) => {
  const [state, actionFunction] = useActionState(
    handleSubscription,
    InitialFormState,
  );

  return (
    <Form action={actionFunction}>
      <input type="hidden" className="sr-only" value={name} name="name" />
      <input type="hidden" className="sr-only" value={_id} name="_id" />
      <input
        type="hidden"
        className="sr-only"
        value={stripePriceId}
        name="stripePriceId"
      />
      <SubmitButton label="Subscribe" />
    </Form>
  );
};

export default MembershipForm;
