import Link from 'next/link';
import { signOutAction } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function AuthButton(): Promise<React.ReactNode> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <form className='items-center flex gap-3' action={signOutAction}>
      <Button type='submit' variant='outline'>
        Log out
      </Button>
    </form>
  ) : (
    <div className='flex gap-2'>
      <Button className='' asChild size='sm' variant='outline'>
        <Link href='/sign-in'>Login</Link>
      </Button>
      <Button
        asChild
        size='sm'
        variant='default'
        className='hidden lg:flex text-center'
      >
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  );
}
