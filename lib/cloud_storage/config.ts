export const CLOUD_CONFIG = {
  folder: process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER,
  baseUrl: process.env.NEXT_PUBLIC_AWS_BASE_URL,
};

export type CloudConfig = typeof CLOUD_CONFIG;
