import { ReactNode } from 'react';

export default function Header(): ReactNode {
  return (
    <div className='flex flex-col gap-16 items-center'>
      <h1 className='sr-only'>Welcome to your fitness journal</h1>
      <p className='text-2xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center'>
        A place to keep all your adventure journals, climbing logs, trip
        planning and trip reports. Or any other adventure you go on!
      </p>
      <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8' />
    </div>
  );
}
