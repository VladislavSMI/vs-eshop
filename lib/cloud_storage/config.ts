export const CLOUD_CONFIG = {
  bucket: process.env.AWS_STATIC_FILE_BUCKET,
  folder: process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER,
  baseUrl: process.env.NEXT_PUBLIC_AWS_BASE_URL,
};

export type CloudConfig = typeof CLOUD_CONFIG;
