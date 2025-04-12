import { Message } from '@/components/form-message';
import LoginForm from '@/components/login-form';

export const metadata = {
  title: 'Login',
};

export default async function Login(props: {
  searchParams: Promise<Message>;
}): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;

  return <LoginForm searchParams={searchParams} />;
}
