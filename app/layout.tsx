import { Geist } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@/components/ui/sidebar';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import RootLayout from '@/app/(root)/layout';
import AuthProvider from '@/app/providers/auth-provider';
import './globals.css';

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

export default async function ThemeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialSession={user}>
            <SidebarProvider defaultOpen={defaultOpen}>
              <RootLayout>{children}</RootLayout>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
