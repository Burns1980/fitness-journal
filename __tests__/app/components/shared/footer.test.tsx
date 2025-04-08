import { render, screen } from '@testing-library/react';
import Footer from '@/components/shared/footer';

jest.mock(
  '@/components/shared/supabase-logo',
  () => (): (() => React.ReactNode) => {
    const SupabaseLogoMock = (): React.ReactNode => (
      <div data-testid='supabase-logo' />
    );
    SupabaseLogoMock.displayName = 'SupabaseLogoMock';
    return SupabaseLogoMock;
  }
);
// jest.mock('@/components/shared/theme-switcher', () => () => (
//   <div data-testid='theme-switcher' />
// ));

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('generic');
    expect(footerElement).toBeInTheDocument();
  });

  // it('renders the Supabase logo with the correct link', () => {
  //   render(<Footer />);
  //   const linkElement = screen.getByRole('link', { name: /powered by/i });
  //   expect(linkElement).toHaveAttribute(
  //     'href',
  //     'https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
  //   );
  //   expect(linkElement).toHaveAttribute('target', '_blank');
  //   expect(linkElement).toHaveAttribute('rel', 'noreferrer');
  //   const logoElement = screen.getByTestId('supabase-logo');
  //   expect(logoElement).toBeInTheDocument();
  // });

  // it('renders the ThemeSwitcher component', () => {
  //   render(<Footer />);
  //   const themeSwitcher = screen.getByTestId('theme-switcher');
  //   expect(themeSwitcher).toBeInTheDocument();
  // });
});
