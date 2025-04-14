import { Menu } from 'lucide-react';
import NonAuthMenu from '@/components/shared/header/non-auth-menu';
import MobileSidebarTrigger from '@/components/ui/custom-sidebar-trigger';
import { createClient } from '@/utils/supabase/server';

export default async function HeaderMenu(): Promise<React.ReactNode> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='lg:hidden'>
      {!!user ? (
        <div>
          <MobileSidebarTrigger className='pl-1'>
            <Menu />
          </MobileSidebarTrigger>
        </div>
      ) : (
        <NonAuthMenu />
      )}
    </div>
  );
}
