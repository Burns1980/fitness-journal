'use client';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  function handleSignInClick() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className='w-full'>
        <div className='pt-10 flex h-full flex-col'>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className='flex flex-1 flex-col items-center gap-4 pt-8'>
            <Button variant="lgGhost" className='w-[15rem]'>
              Contact us
            </Button>
            <Button variant="lgGhost" className='w-[15rem]'>
              About us
            </Button>
          </div>
          <div className='mb-14 flex flex-col justify-center gap-4'>
            <Button onClick={handleSignInClick} className='w-full'>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
            <Button
              variant="secondary"
              onClick={handleSignInClick}
              className='w-full'
            >
              <Link href='/sign-up'>Sign up</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
