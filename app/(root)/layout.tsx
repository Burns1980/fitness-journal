import { AppSidebar } from '@/components/shared/app-sidebar';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <>
      <AppSidebar />
      <main className='flex flex-col min-h-screen w-full'>
        <div className='flex flex-1 flex-col gap-2 items-center'>
          <Header />
          <div className='flex flex-col w-full flex-1 items-center gap-20 p-5'>
            {children}
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
