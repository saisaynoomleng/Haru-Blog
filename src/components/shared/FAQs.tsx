import { twMerge } from 'tailwind-merge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import clsx from 'clsx';

type FAQ = {
  title: string;
  body: string;
};

type FAQsProps = {
  name: string;
  faqs: FAQ[];
  className?: string;
};

export const FAQs = ({ name, faqs, className }: FAQsProps) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-y-3 px-5', className))}>
      <h2
        data-testid="faqs title"
        className="text-fs-500 font-semibold text-brand-primary-600 font-sans"
      >
        {name}
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem value={faq.title} key={faq.title}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
