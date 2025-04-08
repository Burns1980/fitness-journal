import Image from 'next/image';
import Link from 'next/link';
import DeployButton from '@/components/shared/deploy-button';
import HeaderAuth from '@/components/shared/header/header-auth';
import HeaderMenu from '@/components/shared/header/header-menu';
import { APP_NAME } from '@/lib/constants';

export default function Header(): React.ReactNode {
  return (
    <header className='flex-none w-full border-b'>
      <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
        <div className='w-full flex justify-between items-center p-3 px-5 text-sm'>
          <div className='lg:hidden'>
            <HeaderMenu />
          </div>
          <div className='flex gap-5 items-center'>
            <Link href='/' className='flex items-center gap-2'>
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
  );
}
