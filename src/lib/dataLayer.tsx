import { JSX } from 'react';
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

export const socialIcons: Record<string, JSX.Element> = {
  twitter: <BsTwitterX />,
  facebook: <BsFacebook />,
  youtube: <BsYoutube />,
  instagram: <BsInstagram />,
  linkedin: <BsLinkedin />,
  github: <BsGithub />,
};

export const InitialFormState = {
  success: false,
  message: '',
  field: '',
};
