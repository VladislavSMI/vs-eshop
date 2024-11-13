import { VALID_TAGS } from './const';
import { Tag } from './types';

export const formatCurrency = (amount: number) =>
  (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const isProduction = () => process.env.NODE_ENV === 'production';
export const isBrowser = () => typeof window !== 'undefined';

export const isValidTag = (tag: string): tag is Tag =>
  VALID_TAGS.includes(tag as Tag);

export const isMockEnabled = (): boolean => process.env.MOCK_DB === 'true';
