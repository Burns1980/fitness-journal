import Hero from '@/components/hero';
import MobileMenuDrawer from '@/components/mobile-menu-drawer';

export default async function Home() {
  return (
    <>
      <MobileMenuDrawer />
      <Hero />
    </>
  );
}
