export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
): string => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatPrice = ({
  price,
  locale = 'en-US',
  currencyCode = 'EUR',
  currencyDisplay = 'symbol',
  divisor = 1,
}: {
  price: number;
  locale?: string;
  currencyCode?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  divisor?: number;
}): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay,
  };
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(price / divisor);
};

export const isProduction = () => process.env.NODE_ENV === 'production';

export const isBrowser = () => typeof window !== 'undefined';

export const isMockEnabled = (): boolean => process.env.MOCK_DB === 'true';

export const setCursor = (type: 'default' | 'grab' | 'grabbing') => {
  document.body.style.cursor = type;
};

export const normalizeSQL = (sql: string) => sql.replace(/\s+/g, ' ').trim();

/**
 * Get array from 0..(n-1) containing `n` entries
 */
export const getRange = (n: number) => Array.from(Array(n).keys());

export const printException = (e: unknown) => {
  if (e instanceof Error) {
    return e.stack;
  }
  return 'Unknown error';
};
