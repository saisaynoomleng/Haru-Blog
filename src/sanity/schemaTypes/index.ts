import { type SchemaTypeDefinition } from 'sanity';
import {
  blockContentType,
  faqType,
  imageWithAltType,
  seoType,
  socialLinkType,
} from './sharedType';
import { memberType } from './documents/memberType';
import { ourStoryType } from './documents/ourStoryType';
import { faqsType } from './documents/faqsType';
import { membershipType } from './documents/membershipType';
import { authorType } from './documents/authorType';
import { categoryType } from './documents/categoryType';
import { blogType } from './documents/blogType';
import { utilityPageType } from './documents/utilityPageType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    imageWithAltType,
    seoType,
    faqType,
    socialLinkType,
    memberType,
    ourStoryType,
    faqsType,
    membershipType,
    authorType,
    categoryType,
    blogType,
    utilityPageType,
  ],
};
