export const VALID_TAGS = ['On Sale', 'New', 'Last in Inventory'] as const;
export const LOCALES = ['en', 'nl'] as const;
export const ITEMS_PER_PAGE = 8;
export const ORDER_STATES = [
  'created',
  'paid',
  'shipped',
  'cancelled',
  'refunded',
] as const;

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@vsskate.com';
