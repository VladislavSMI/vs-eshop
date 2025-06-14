import { CLOUD_CONFIG, CloudConfig } from '../cloud-storage/config';
import { CONST } from '../const';

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

export const collapseDuplicateSlashes = (path: string): string =>
  path.replace(/^\/+/, '/').replace(/([^:]\/)\/+/g, '$1');

export const trimEndingSlash = (path: string): string =>
  path.replace(/\/$/, '');

export const trimStartingSlash = (path: string): string =>
  path.replace(/^\//, '');

export const joinPathSegments = (
  segments: string[],
  {
    addLeading = false,
    addTrailing = false,
  }: { addLeading?: boolean; addTrailing?: boolean } = {},
): string => {
  let path = collapseDuplicateSlashes(
    `/${segments.filter(Boolean).join('/')}/`,
  );

  if (!addLeading) path = trimStartingSlash(path);
  if (!addTrailing) path = trimEndingSlash(path);

  return path;
};

export const getPublicUrl = (
  url: string | null,
  config: Pick<CloudConfig, 'baseUrl' | 'folder'> = CLOUD_CONFIG,
): string => {
  if (!url || !config.baseUrl || !config.folder) {
    return CONST.missingImage;
  }
  return joinPathSegments([config.baseUrl, config.folder, url]);
};

export const generateRelativeImageUrl = ({
  productId,
  imageId,
  mimeType,
}: {
  productId: string;
  imageId: string;
  mimeType: string;
}) => {
  if (!productId || !imageId || !mimeType) return null;

  const parts = mimeType.split('/');
  if (parts.length !== 2) return null;

  return `${productId}/${imageId}.${parts[1]}`;
};

export const isServer = () => typeof window !== 'object';

export function isProtectedPath(rawPath: string): boolean {
  const [pathname] = rawPath.split(/[?#\\]/);

  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return false;

  // if first segment is a locale, page is second, otherwise it’s first
  const maybeLocale = segments[0];
  const page =
    CONST.locales.includes(maybeLocale) && segments.length > 1
      ? segments[1]
      : segments[0];

  return CONST.protectedPages.includes(page);
}
