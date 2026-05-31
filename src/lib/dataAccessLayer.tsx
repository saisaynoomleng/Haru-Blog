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

export const mockReviewCard = {
  title: `Clean modern perspective`,
  username: `anna_luxstyle`,
  role: `Brand Strategist`,
  rating: 5,
  body: `The content feels modern, clean, and aligned with current fashion direction.`,
  reviewedAt: '2026-05-10',
};
