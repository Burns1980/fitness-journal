import Link from 'next/link';
import { signInAction, signInWithGoogle } from '@/actions/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/shared/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const metadata = {
  title: 'Sign In',
};

export default function LoginForm(props: {
  searchParams: Message;
}): React.ReactNode {
  const searchParams = props.searchParams;

  return (
    <div className='max-w-64'>
      <form className='flex-1 flex flex-col min-w-64'>
        <h1 className='text-3xl pt-2 pb-2 font-medium'>Login</h1>
        <p className='text-sm text-foreground'>
          {"Don't have an account? "}
          <Link
            className='text-foreground font-medium underline'
            href='/sign-up'
          >
            Sign up
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            id='email'
            type='email'
            placeholder='you@example.com'
            autoComplete='email'
            required
          />
          <div className='flex justify-between items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link
              className='text-xs text-foreground underline'
              href='/forgot-password'
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type='password'
            name='password'
            id='password'
            minLength={5}
            placeholder='Your password'
            autoComplete='new-password'
            required
          />
          <SubmitButton pendingText='Signing In...' formAction={signInAction}>
            Login
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <form className='flex-1 flex flex-col min-w-64 mt-8'>
        <SubmitButton
          className='bg-blue-700 text-white hover:bg-blue-600'
          pendingText='Signing In with Google...'
          formAction={signInWithGoogle}
        >
          Login with Google
        </SubmitButton>
      </form>
    </div>
  );
}
