'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';

export const signUpAction = async (formData: FormData): Promise<undefined> => {
  const email = formData.get('email');
  const password = formData.get('password');
  if (typeof email !== 'string' || typeof password !== 'string') {
    return encodedRedirect(
      'error',
      '/sign-in',
      'Invalid email and/or password type'
    );
  }
  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    // console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    revalidatePath('/', 'layout');
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

export const signInWithGoogle = async (): Promise<undefined> => {
  console.log('google sign in');
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }
  if (data.url) {
    return redirect(data.url);
  }
};

export const signInAction = async (formData: FormData): Promise<undefined> => {
  console.log('sign in action');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  revalidatePath('/', 'layout');
  return redirect('/private');
};

export const forgotPasswordAction = async (
  formData: FormData
): Promise<undefined> => {
  const email = formData.get('email');
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl');

  if (typeof email !== 'string') {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  // ToDo if callbackUrl isn't a string, then thre was an error with
  //
  if (callbackUrl && typeof callbackUrl !== 'string') {
    return encodedRedirect(
      'error',
      '/forgot-password',
      'An error occurred retieving callbackUrl'
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=//reset-password`,
  });

  if (error) {
    // console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (
  formData: FormData
): Promise<undefined> => {
  const supabase = await createClient();

  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
    return encodedRedirect(
      'error',
      '//reset-password',
      'Something went wrong parsing passwords as values were not strings'
    );
  }

  if (!password || !confirmPassword) {
    return encodedRedirect(
      'error',
      '//reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      'error',
      '//reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return encodedRedirect(
      'error',
      '//reset-password',
      'Password update failed'
    );
  }

  return encodedRedirect('success', '//reset-password', 'Password updated');
};

export const signOutAction = async (): Promise<undefined> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.auth.signOut({ scope: 'global' });
    console.log('signout action');
  }

  revalidatePath('/', 'layout');

  return redirect('/sign-in');
};
