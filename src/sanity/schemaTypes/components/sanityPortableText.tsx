import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const SanityPortableText: PortableTextComponents = {
  types: {
    image: (props) => {
      props.value ? (
        <Image
          src={urlFor(props.value).format('webp').url()}
          width={600}
          height={400}
          className="rounded-lg object-cover"
          alt={props.value.alt || ''}
          loading="lazy"
        />
      ) : null;
    },
  },

  marks: {
    strong: ({ children }) => <strong className="">{children}</strong>,

    link: ({ value, children }) => (
      <Link
        href={value}
        className="underline decoration-brand-primary-600 underline-offset-2 decoration-1"
      >
        {children}
      </Link>
    ),
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-brand-primary-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-brand-primary-800">{children}</h3>
    ),
    h4: ({ children }) => (
      <h2 className="text-brand-primary-800">{children}</h2>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-brand-primary-600">{children}</li>
    ),
  },
};
