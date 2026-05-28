import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { quilon } from '@/lib/fonts';
import { SpeedInsights } from '@vercel/speed-insights/next';

const karla = Karla({
  variable: '--font-karla',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Haru Blog',
    template: '%s | Haru Blog',
  },
  description:
    'Founded on the principle that fashion is the most immediate language of culture, Haru Blog began as a digital mood board for the modern enthusiast. Today, we have evolved into a comprehensive media platform that bridges the gap between the runway and the everyday, delivering meticulously researched news and trends in beauty, skincare, and global style.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${quilon.variable} h-full antialiased`}
    >
      <ClerkProvider>
        <body className="min-h-full flex flex-col">
          {children}
          <SpeedInsights />
        </body>
      </ClerkProvider>
    </html>
  );
}
