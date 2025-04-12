// Reference only - delete before push to prod
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/shared/submit-button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { signInAction, signInWithGoogle } from '@/actions/actions';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Minimun characters is 4' })
    .max(25, { message: 'Maximum characters is 25' })
    .trim(),
});

export default function SignInForm(): React.ReactNode {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // needed for client side error handling
  function onSubmit(data: z.infer<typeof formSchema>): void {}

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className='flex flex-col min-w-64 space-y-4'
        >
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
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='email'
                    placeholder='you@example.com'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>Email you want to Login with</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between items-center'>
                  <FormLabel>Password</FormLabel>
                  <span>
                    <Link
                      className='text-xs text-foreground underline'
                      href='/forgot-password'
                    >
                      Forgot Password?
                    </Link>
                  </span>
                </div>
                <FormControl>
                  <Input
                    autoComplete='new-password'
                    type='password'
                    placeholder='Your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton formAction={signInAction}>Login</SubmitButton>
          <div className='pt-1 flex flex-col gap-3 justify-betwen items-center'>
            {/* <SubmitButton
              type='submit'
              // onClick={() => void handleGoogleSubmit()}
              // onSubmit={() => void handleGoogleSubmit()}
              formAction={signInWithGoogle}
              className='bg-blue-700 text-white hover:bg-blue-600 w-full mt-4'
              pendingText='Signing In with Google...'
            >
              Login with Google
            </SubmitButton> */}
          </div>
        </form>
      </Form>
      <p className='text-center items-center'>Or login with Google</p>
      <form className='flex-1 flex flex-col min-w-64 mt-3'>
        <SubmitButton
          className='bg-blue-700 text-white hover:bg-blue-600'
          pendingText='Signing In with Google...'
          formAction={signInWithGoogle}
        >
          Login with Google
        </SubmitButton>
        {/* <FormMessage message={searchParams} /> */}
      </form>
    </div>
  );
}
