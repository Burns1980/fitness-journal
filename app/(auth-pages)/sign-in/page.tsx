import Link from 'next/link';
import { signInAction, signInWithGoogle } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/shared/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignInForm from '@/components/sign-in-form';

export const metadata = {
  title: 'Sign In',
};

export default async function Login(props: {
  searchParams: Promise<Message>;
}): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;

  return (
    <SignInForm />
    //   <div>
    //     <form className='flex-1 flex flex-col min-w-64'>
    //       <h1 className='text-3xl pt-2 pb-2 font-medium'>Sign in</h1>
    //       <p className='text-sm text-foreground'>
    //         {"Don't have an account? "}
    //         <Link
    //           className='text-foreground font-medium underline'
    //           href='/sign-up'
    //         >
    //           Sign up
    //         </Link>
    //       </p>
    //       <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
    //         <Label htmlFor='email'>Email</Label>
    //         <Input
    //           name='email'
    //           id='email'
    //           placeholder='you@example.com'
    //           required
    //         />
    //         <div className='flex justify-between items-center'>
    //           <Label htmlFor='password'>Password</Label>
    //           <Link
    //             className='text-xs text-foreground underline'
    //             href='/forgot-password'
    //           >
    //             Forgot Password?
    //           </Link>
    //         </div>
    //         <Input
    //           type='password'
    //           name='password'
    //           id='password'
    //           placeholder='Your password'
    //           required
    //         />
    //         <SubmitButton pendingText='Signing In...' formAction={signInAction}>
    //           Sign in
    //         </SubmitButton>
    //         <FormMessage message={searchParams} />
    //       </div>
    //     </form>
    //     <form className='flex-1 flex flex-col min-w-64 mt-8'>
    //       <SubmitButton
    //         className='bg-blue-700 text-white hover:bg-blue-600'
    //         pendingText='Signing In with Google...'
    //         formAction={signInWithGoogle}
    //       >
    //         Sign in with Google
    //       </SubmitButton>
    //       <FormMessage message={searchParams} />
    //     </form>
    //   </div>
  );
}
