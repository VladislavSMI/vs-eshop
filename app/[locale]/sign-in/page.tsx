import { SignInForm } from '@/components/sing-in/SignInForm';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function SignInPage() {
  const t = await getTranslations('components.signInForm');

  return (
    <div className="h-full p-5 text-neutral-content">
      <div className="container mx-auto max-w-2xl">
        <h1 className="pt-5 text-4xl font-bold text-primary">{t('signIn')}</h1>
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
