'use client';

import { handleUserPhotoForm } from '@/actions/handleUserPhotoForm';
import { InitialFormState } from '@/lib/dataAccessLayer';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import Image from 'next/image';

type UserPhotoFormProps = {
  imageUrl: string;
};

const UserPhotoForm = ({ imageUrl }: UserPhotoFormProps) => {
  const [state, actionFunction] = useActionState(
    handleUserPhotoForm,
    InitialFormState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <Form
      action={actionFunction}
      formEncType="multipart/form-data"
      className="flex flex-col gap-4 md:flex-row items-end justify-between"
    >
      <div className="overflow-hidden relative aspect-square w-25 h-25 rounded-full">
        <Image
          src={imageUrl}
          alt="user photo"
          fill
          className="max-w-25"
          sizes="(max-width:100px) 100vw, 66vw"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <label htmlFor="profilePhoto" className="sr-only">
          Change Profile Photo
        </label>
        <Input
          type="file"
          name="imageUrl"
          id="profilePhoto"
          accept="image/*"
          className=""
        />
      </div>

      <SubmitButton label="update" />
    </Form>
  );
};

export default UserPhotoForm;
