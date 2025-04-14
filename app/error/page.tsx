import { Button } from '@/components/ui/button';
import { URI_MESSAGE } from '@/types/global';
import Link from 'next/link';

export default async function ErrorPage(props: {
  searchParams: Promise<URI_MESSAGE>;
}): Promise<React.ReactNode> {
  const message = await props.searchParams;
  if ('error' in message) {
    return (
      <div className='flex flex-col items-center gap-5'>
        <p className='text-destructive-foreground border-l-2 border-destructive-foreground px-4'>
          {message.error} Try logging in again.
        </p>
        <Button asChild>
          <Link href='/sign-in'>Login</Link>
        </Button>
      </div>
    );
  }
  return <div>An uknown error occurred.</div>;
}
