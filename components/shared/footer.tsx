import SupabaseLogo from '@/components/shared/supabase-logo';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';

export default function Footer() {
  return (
    <footer className='w-full flex-none flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-5'>
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
  );
}
