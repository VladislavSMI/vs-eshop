import React from 'react';
import { useTranslations } from 'next-intl';
import { render } from '@testing-library/react';
import AboutUs from '@/app/[locale]/(footer)/about-us/page';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
}));

describe('AboutUs Component', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: { [key: string]: string } = {
        title: 'About Us',
        text: 'Welcome to VS Skate Shop!',
      };
      return translations[key];
    });
  });

  it('renders correctly in English', () => {
    const { getByText } = render(<AboutUs params={{ locale: 'en' }} />);

    expect(getByText('About Us')).toBeInTheDocument();
    expect(getByText('Welcome to VS Skate Shop!')).toBeInTheDocument();
  });

  it('renders correctly in Dutch', () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: { [key: string]: string } = {
        title: 'Over ons',
        text: 'Welkom bij VS Skate Shop!',
      };
      return translations[key];
    });

    const { getByText } = render(<AboutUs params={{ locale: 'nl' }} />);

    expect(getByText('Over ons')).toBeInTheDocument();
    expect(getByText('Welkom bij VS Skate Shop!')).toBeInTheDocument();
  });

  it('renders accessible elements', () => {
    const { getByRole } = render(<AboutUs params={{ locale: 'en' }} />);

    expect(getByRole('heading', { level: 1 })).toHaveTextContent('About Us');
  });

  it('applies correct CSS classes', () => {
    const { getByText } = render(<AboutUs params={{ locale: 'en' }} />);

    expect(getByText('About Us')).toHaveClass('text-4xl');
    expect(getByText('Welcome to VS Skate Shop!')).toHaveClass('md:text-lg');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AboutUs params={{ locale: 'en' }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
