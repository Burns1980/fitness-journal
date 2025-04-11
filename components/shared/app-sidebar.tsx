'use client';

import { useAuth } from '@/app/providers/auth-provider';
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Caravan,
  Mountain,
  Settings,
  ChartNoAxesColumnDecreasing,
  Users,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import MobileTrigger from '@/components/ui/custom-sidebar-trigger';
import { useContext, useEffect, useState } from 'react';

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
    url: '/private/climbs',
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
    icon: Caravan,
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
    title: 'Settings',
    url: '/private/settings',
    icon: Settings,
  },
];

export function AppSidebar(): React.ReactNode {
  const { isMobile } = useSidebar();
  const authData = useAuth();

  // console.log(authData);

  return (
    <div>
      {/* {isMobile && (
        <MobileTrigger>
          <Menu />
        </MobileTrigger>
      )} */}
      {!!authData?.user && (
        <Sidebar collapsible={isMobile ? 'offcanvas' : 'none'}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Adventure Journal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
}
