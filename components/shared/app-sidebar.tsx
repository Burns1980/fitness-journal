'use client';

import { useAuth } from '@/app/providers/auth-provider';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Caravan,
  CircleUser,
  ChartNoAxesColumnDecreasing,
  Home,
  Luggage,
  Mountain,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { signOutAction } from '@/actions/actions';

const menuItems: {
  title: string;
  url: string;
  icon: React.ElementType;
}[] = [
  {
    title: 'Home',
    url: '/private',
    icon: Home,
  },
  {
    title: 'Climbs',
    url: '/private/climb-journal',
    icon: Mountain,
  },
  {
    title: 'Trip Report',
    url: '/private/trip-report',
    icon: Caravan,
  },
  {
    title: 'Trip Planning',
    url: '/private/trip-planning',
    icon: Luggage,
  },
  {
    title: 'Partners',
    url: '/private/partners',
    icon: Users,
  },
  {
    title: 'Stats',
    url: '/private/stats',
    icon: ChartNoAxesColumnDecreasing,
  },
  {
    title: 'Profile',
    url: '/private/user-profile',
    icon: CircleUser,
  },
  {
    title: 'Settings',
    url: '/private/settings',
    icon: Settings,
  },
];

export function AppSidebar(): React.ReactNode {
  const { isMobile, toggleSidebar, setOpenMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const authData = useAuth();

  useEffect(() => {
    setMounted(true);

    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  if (!mounted || !authData?.user) return null;

  return (
    <div className='border-r-2'>
      {!!authData?.user && (
        <Sidebar className='pt-3' collapsible={isMobile ? 'offcanvas' : 'none'}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className='justify-center pt-2 text-foreground mb-10 text-md'>
                {isMobile ? authData.user.email : `Adventure Journal`}
              </SidebarGroupLabel>
              <SidebarGroupContent className='pl-3'>
                <SidebarMenu className='gap-5'>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={toggleSidebar} asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span className='text-md'>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <form className='items-center flex gap-3' action={signOutAction}>
              <Button className='flex-1 mb-3' type='submit'>
                Log out
              </Button>
            </form>
          </SidebarFooter>
        </Sidebar>
      )}
    </div>
  );
}
