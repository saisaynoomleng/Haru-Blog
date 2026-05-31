import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { FOOTER_QUERY } from '@/sanity/lib/queries';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { socialIcons } from '@/lib/dataLayer';

const Footer = async () => {
  const { data: footer } = await sanityFetch({ query: FOOTER_QUERY });

  if (!footer) return null;

  const {
    logoUrl,
    logoAlt,
    footerDescription,
    footerColumns,
    contactInfo,
    socialLinks,
  } = footer;

  return (
    <footer
      className={clsx(
        'pt-12 md:pt-20 bg-brand-neutral-900 text-brand-neutral-50 px-8 md:px-12 grid gap-y-4 md:gap-x-12 md:grid-cols-[1fr_3fr] pb-8 md:pb-12',
      )}
      role="footer"
    >
      <div className="flex flex-col gap-y-3">
        {logoAlt && logoUrl ? (
          <Image
            src={urlFor(logoUrl).format('webp').url()}
            alt={logoAlt}
            width={400}
            height={300}
            className="object-cover min-w-full"
            loading="lazy"
          />
        ) : null}
        <p className="text-center text-neutral-50/70 text-fs-300">
          {footerDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-5 gap-y-3">
        {footerColumns &&
          footerColumns.map((column, i) => (
            <div key={i} className="space-y-3">
              <p className="font-semibold">{column.title}</p>
              <ul className="flex flex-col gap-y-1">
                {column.links &&
                  column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href as string}
                        className="hover:underline text-brand-neutral-50/70 decoration-brand-primary-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

        <div className="space-y-2">
          <p className="font-semibold">Contact Us</p>
          {contactInfo && (
            <address className="text-neutral-50/70">
              <p>{contactInfo.address1}</p>
              <p>{contactInfo.address2}</p>
              <p>
                <span>{contactInfo.city}</span>, <span>{contactInfo.zip}</span>
              </p>
              <p>{contactInfo.country}</p>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </address>
          )}
        </div>
      </div>

      <div className="col-span-full md:place-self-end">
        <ul className="flex gap-x-2 items-center">
          {socialLinks &&
            socialLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url as string}
                  className="hover:text-brand-primary-400 text-brand-neutral-50/70"
                >
                  {socialIcons[link.platform as string]}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-span-full flex flex-col md:flex-row justify-between text-neutral-50/70 text-fs-300">
        <p>copyright&reg;harublog 2020-{new Date().getFullYear()}</p>
        <p>designed & developed by sai say noom leng</p>
      </div>
    </footer>
  );
};

export default Footer;
