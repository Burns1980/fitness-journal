import Link from 'next/link';
import { SmtpMessage } from '../smtp-message';
import { signUpAction } from '@/actions/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/shared/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div className='w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4'>
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className='flex flex-col min-w-64 max-w-64 mx-auto'>
        <h1 className='text-3xl pb-2 pt-2 font-medium'>Sign up</h1>
        <p className='text-sm text text-foreground'>
          Already have an account?{' '}
          <Link className='text-primary font-medium underline' href='/sign-in'>
            Login
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            id='email'
            type='email'
            placeholder='you@example.com'
            autoComplete='username'
            required
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Your password'
            minLength={6}
            autoComplete='new-password'
            required
          />
          <SubmitButton formAction={signUpAction} pendingText='Signing up...'>
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
