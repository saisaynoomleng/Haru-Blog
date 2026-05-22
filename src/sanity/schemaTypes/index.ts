import { type SchemaTypeDefinition } from 'sanity';
import {
  blockContentType,
  faqType,
  imageWithAltType,
  seoType,
  socialLinkType,
} from './sharedType';
import { memberType } from './documents/memberType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    imageWithAltType,
    seoType,
    faqType,
    socialLinkType,
    memberType,
  ],
};
