'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

export default function NotFound(): React.ReactNode {
  return (
    <div className='flex w-full flex-1 flex-col items-center justify-center'>
      <Image
        src='/images/climbing-bag-logo.jpg'
        height={48}
        width={48}
        alt={`${APP_NAME} logo`}
      />
      <div className='p-6 w-1/3 rounded-lg text-center'>
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <p className='dark:text-[#DF3A3A] text-[#E60000]'>
          Could not find the requested page
        </p>
        <Button className='mt-4' onClick={() => (window.location.href = '/')}>
          Back to home page
        </Button>
      </div>
    </div>
  );
}
