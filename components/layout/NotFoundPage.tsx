import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('errors.404');

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
      <FaceFrownIcon className="mb-4 w-20" />
      <h1 className="mb-2 text-xl font-semibold">{t('title')}</h1>
      <p className="mb-4">{t('message')}</p>
      <Link
        href="/"
        className="btn btn-ghost btn-outline mt-5"
        prefetch={false}
      >
        {t('goBack')}
      </Link>
    </div>
  );
}
