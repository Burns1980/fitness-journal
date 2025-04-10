import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import RootLayout from './(root)/layout';
import './globals.css';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: `%s | Adventure Journal`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function ThemeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
