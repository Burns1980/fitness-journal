import Link from 'next/link';
import { signOutAction } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type='submit' variant='outline'>
          Sign out
        </Button>
      </form>
    </div>
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
