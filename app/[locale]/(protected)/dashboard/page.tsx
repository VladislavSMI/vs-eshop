import { getTranslations } from 'next-intl/server';

export default async function DashboardPage() {
  const t = await getTranslations('pages.dashboard');

  return (
    <div className="h-full text-neutral-content">
      <div className="container mx-auto max-w-2xl px-5 py-10">
        <h1 className="mb-6 text-4xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-6">{t('description')}</p>
      </div>
    </div>
  );
}
