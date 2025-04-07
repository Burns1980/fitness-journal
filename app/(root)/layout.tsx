import DeployButton from '@/components/deploy-button';
import SupabaseLogo from '@/components/supabase-logo';
import HeaderAuth from '@/components/header-auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <div className='flex-1 w-full flex flex-col gap-2 items-center'>
        <header className='w-full border-b'>
          <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
            <div className='w-full flex justify-between items-center p-3 px-5 text-sm'>
              <Menu className='lg:hidden' />
              <div className='flex gap-5 items-center'>
                <Link href={'/'} className='flex items-center gap-2'>
                  <Image
                    src='/images/climbing-bag-logo.jpg'
                    alt={`${APP_NAME} home page`}
                    height={35}
                    width={48}
                    priority={true}
                  />
                  <span className='hidden lg:block'>{APP_NAME}</span>
                </Link>
                <div className='flex items-center gap-2'>
                  <DeployButton />
                </div>
              </div>
              <HeaderAuth />
            </div>
          </nav>
        </header>
        <div className='flex flex-col flex-1 gap-20 max-w-5xl p-5'>
          {children}
        </div>
        <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-5'>
          <div className='flex items-center gap-2'>
            Powered by{' '}
            <a
              href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
              target='_blank'
              className='font-bold hover:underline'
              rel='noreferrer'
            >
              <span>
                <SupabaseLogo />
              </span>
            </a>
          </div>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
