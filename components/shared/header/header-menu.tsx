import { createClient } from '@/utils/supabase/server';
import NonAuthMenu from './non-auth-menu';

export default async function HeaderMenu(): Promise<React.ReactNode> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='lg:hidden'>
      {!!user ? <div>test</div> : <NonAuthMenu />}
    </div>
  );
}
