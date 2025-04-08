'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);

  function handleSignInClick() {
    setOpen(false);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button asChild variant={'ghost'} className='p-0'>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='min-h-[90vh]'>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
