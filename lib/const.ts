export const VALID_TAGS = ['On Sale', 'New', 'Last in Inventory'] as const;
export const LOCALES = ['en', 'nl'] as const;
export const PROTECTED_PAGES = ['dashboard'] as const;
export const ITEMS_PER_PAGE = 8 as const;
export const ORDER_STATES = [
  'created',
  'paid',
  'shipped',
  'cancelled',
  'refunded',
] as const;

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ('support@vsskate.com' as const);

export const MISSING_IMAGE = '/assets/missing_image.webp' as const;
