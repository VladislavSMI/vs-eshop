'use client';

import { useTranslations } from 'next-intl';
import { useSignInFormActions } from '@/lib/hooks/useSignInFormActions';
import { InputField } from '../ui/Fields/InputField';
import { Message } from '../ui/Message';

export const SignInForm = () => {
  const { handleSubmit, errorMessage, isSubmitting } = useSignInFormActions();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  const t = useTranslations('components.signInForm');

  return (
    <div className="h-full">
      <div className="py-5">
        <h1 className="mb-2 text-xl font-bold text-primary">
          {t('description')}
        </h1>
        <p>{t('email')}: john.doe@skateshop.com</p>
        <p>{t('password')}: password1#2#3#</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="email"
          id="email"
          name="email"
          placeholder={`${t('email')}*`}
        />
        <InputField
          type="password"
          id="password"
          name="password"
          placeholder={`${t('password')}*`}
        />

        <Message message={errorMessage} type="error" />

        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('signingIn') : t('signIn')}
          </button>
        </div>
      </form>
    </div>
  );
};
