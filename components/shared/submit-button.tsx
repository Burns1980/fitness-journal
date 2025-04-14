'use client';

import { LoaderCircle } from 'lucide-react';
import { type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = 'Submitting...',
  ...props
}: Props): React.ReactNode {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit' aria-disabled={pending} {...props}>
      {pending ? (
        <div className='flex flex-row-reverse gap-2'>
          <span>{pendingText}</span>
          <LoaderCircle className='animate-spin' />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
