import type { Metadata } from 'next';
import { Rubik, Niconne } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { StoreProvider } from '@/context/StoreContext';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

const rubik = Rubik({ subsets: ['latin'] });
// const niconne = Niconne({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Topfactoryng',
  description: 'An online fashion store.',
};

//Used to revalidate all cached fetch request incase product details changes
export const revalidate = 5;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen antialiased', rubik.className)}>
        <StoreProvider>
          <Toaster position='top-center' />
          {children}
        </StoreProvider>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
