'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export const useSignInFormActions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setErrorMessage(
        res.error === 'CredentialsSignin'
          ? t('components.signInForm.invalidCredentials')
          : t('components.signInForm.somethingWentWrong'),
      );
    } else {
      router.push(callbackUrl);
      router.refresh();
    }

    setIsSubmitting(false);
  };

  return {
    errorMessage,
    isSubmitting,
    handleSubmit,
  };
};
