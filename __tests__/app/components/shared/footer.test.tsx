import { render, screen } from '@testing-library/react';
import Footer from '@/components/shared/footer';

type MockComponent = React.FunctionComponent & {
  displayName?: string;
};

jest.mock('@/components/shared/supabase-logo', () => {
  const SupabaseLogoMock: MockComponent = () => (
    <div data-testid='supabase-logo' />
  );
  SupabaseLogoMock.displayName = 'SupabaseLogoMock';
  return SupabaseLogoMock;
});

jest.mock('@/components/shared/theme-switcher', () => {
  const ThemeSwitcher: MockComponent = () => (
    <div data-testid='theme-switcher' />
  );
  ThemeSwitcher.displayName = 'ThemeSwitcher';
  return { ThemeSwitcher };
});

it('renders the footer element', () => {
  render(<Footer />);
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});

it('renders the Supabase logo with the correct link', () => {
  render(<Footer />);

  const linkPreText = screen.getByText('Powered by');
  const linkElement = linkPreText.firstElementChild;
  const logoElement = screen.getByTestId('supabase-logo');

  expect(linkPreText).toBeInTheDocument();
  expect(linkElement).toHaveAttribute(
    'href',
    expect.stringContaining('https://supabase.com/')
  );
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noreferrer');
  expect(logoElement).toBeInTheDocument();
});

it('renders the ThemeSwitcher component', () => {
  render(<Footer />);
  const themeSwitcher = screen.getByTestId('theme-switcher');
  expect(themeSwitcher).toBeInTheDocument();
});
