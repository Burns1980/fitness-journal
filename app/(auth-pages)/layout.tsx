import { getUser } from '@/actions/actions';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {
  const res = await getUser();

  if ('user' in res) {
    redirect('private');
  }

  return (
    <div className='max-w-7xl flex flex-col gap-12 items-center'>
      {children}
    </div>
  );
}
