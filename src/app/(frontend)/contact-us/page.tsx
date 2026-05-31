import ContactUsForm from '@/components/features/ContactUsForm';
import NewsletterSubscription from '@/components/features/NewsletterSubscription';
import Bounded from '@/components/shared/Bounded';
import Mapbox from '@/components/shared/MapBox';
import PageTitle from '@/components/shared/PageTitle';
import { sanityFetch } from '@/sanity/lib/live';
import { MAP_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';

const ContactUsPage = async () => {
  const { data: map } = await sanityFetch({ query: MAP_QUERY });

  return (
    <Bounded as="main">
      <Bounded padding="none">
        <PageTitle label="contact us" className="font-sans uppercase" />
      </Bounded>

      <Bounded padding="none">
        <ContactUsForm />
      </Bounded>

      <div className="divider"></div>

      <section className="flex gap-y-4 flex-col space-y-0 py-6">
        <PageTitle label="partnerships" className="font-sans uppercase" />
        <p>
          Haru Blog is always open to collaborating with brands, creators,
          agencies, and cultural voices that align with our vision of fashion,
          celebrity, and modern culture.
        </p>
        <p>
          Whether you're interested in sponsored content, creative campaigns,
          brand features, editorial collaborations, event partnerships, or
          long-term media opportunities, we&apos;d love to hear from you.
        </p>
        <p>
          Use the contact form below to share your proposal, goals, and any
          relevant details. Our team carefully reviews every inquiry and will
          get back to you as soon as possible.
        </p>
        <Link
          href="mailto:enquires@harublog.com"
          className="font-semibold underline underline-offset-2 decoration-brand-primary-600 text-brand-primary-600"
        >
          enquires@harublog.com
        </Link>
      </section>

      <div className="divider"></div>

      <Bounded padding="none">
        <PageTitle className="font-sans uppercase" label="Our Address" />
        <address>
          <p>{map?.contactInfo?.address1}</p>
          <p>
            {map?.contactInfo?.city}, {map?.contactInfo?.zip}
          </p>
          <p></p>
          <p>{map?.contactInfo?.country}</p>
          <p>{map?.contactInfo?.email}</p>
          <p>{map?.contactInfo?.phone}</p>
        </address>
        {map && <Mapbox lat={map.lat || 0} long={map.long || 0} />}
      </Bounded>

      <Bounded padding="none">
        <NewsletterSubscription />
      </Bounded>
    </Bounded>
  );
};

export default ContactUsPage;
