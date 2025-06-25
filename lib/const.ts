export const API_TOKENS = {
  seed: 'hQ8ZcOc4mxCgLvJQwUw3am9DZH3xOcs6W4ONbPetmg',
} as const;

export type ConfigConst = {
  apiTokens: typeof API_TOKENS;
  validTags: readonly string[];
  locales: readonly string[];
  protectedPages: readonly string[];
  itemsPerPage: number;
  orderStates: readonly string[];
  supportEmail: string;
  missingImage: string;
  maxSerializableRetries: number;
  serializableBaseDelayMs: number;
};

export const CONST: ConfigConst = {
  apiTokens: API_TOKENS,
  validTags: ['On Sale', 'New', 'Last in Inventory'] as const,
  locales: ['en', 'nl'] as const,
  protectedPages: ['dashboard'] as const,
  itemsPerPage: 8,
  orderStates: ['created', 'paid', 'shipped', 'cancelled', 'refunded'] as const,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@vsskate.com',
  missingImage: '/assets/missing_image.webp',
  maxSerializableRetries: 3,
  serializableBaseDelayMs: 50,
};
