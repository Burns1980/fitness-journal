import Image from 'next/image';
import Link from 'next/link';
import HeaderAuth from '@/components/shared/header/header-auth';
import HeaderMenu from '@/components/shared/header/header-menu';
import { APP_NAME } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';

export default async function Header(): Promise<React.ReactNode> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.identities) {
  }

  return (
    <header className='flex-none w-full border-b'>
      <div className='w-full relative items-center flex justify-between border-b border-b-foreground/10 h-16'>
        <div className='flex-1 pl-2 flex flex-row items-center'>
          <HeaderMenu />
          <span className='pl-5 hidden md:inline text-sm'>{user?.email}</span>
        </div>
        <div className='flex absolute items-center left-1/2 transform -translate-x-1/2'>
          {/* <div className='flex gap-5 items-center'> */}
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/images/climbing-bag-logo.jpg'
              alt={`${APP_NAME} home page`}
              height={35}
              width={48}
              priority={true}
            />
            <span className='hidden text-sm xl:text-lg lg:inline'>
              {APP_NAME}
            </span>
          </Link>
          {/* </div> */}
        </div>
        <div className='pr-3'>
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
}
