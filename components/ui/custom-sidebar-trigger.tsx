import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

export default function CustomSidebarTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button {...props} variant='ghost' onClick={toggleSidebar}>
      {props.children}
    </Button>
  );
}
