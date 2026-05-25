import Bounded from '@/components/shared/Bounded';
import { Hero } from '@/components/shared/Hero';
import { PaperTorn } from '@/components/shared/PaperTorn';
import { YouTubeEmbeded } from '@/components/shared/YouTubeEmbeded';

const mockBlog = {
  author: 'Laura Tarafa',
  category: 'Shopping',
  excerpt:
    'Just days away, Memorial Day weekend is creeping up fast, which means many of our favorite brands are rolling out serious savings on editor-loved essentials. But with so many deals flooding the internet, it can be hard to know what’s actually worth adding to cart, where the steepest discounts are, and which sales truly deserve your attention. ',
  imageAlt: 'two girls looking at their phones',
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/ccb52ed2b9108409dd9f6c07dc67928bcfa2b662-1120x1120.heif',
  title:
    'The 2026 Memorial Day Weekend Deals ELLE Editors Say Are Actually Worth Your Money',
  href: 'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
};

export default function Home() {
  return (
    <Bounded as="main">
      <Hero
        variant="default"
        category={mockBlog.category}
        description={mockBlog.excerpt}
        media={{ imageAlt: mockBlog.imageAlt, imageUrl: mockBlog.imageUrl }}
        action={{ href: mockBlog.href, label: 'Read Article' }}
        title={mockBlog.title}
        eyebrow="LT"
        scrollIndicator
      />
      <YouTubeEmbeded videoId="5NGyXTsg77E" title="lasdf" />
    </Bounded>
  );
}
