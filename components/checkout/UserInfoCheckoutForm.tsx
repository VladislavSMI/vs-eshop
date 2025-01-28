'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CodedField } from '@/lib/types';
import { useCheckoutForm } from '@/lib/hooks/useCheckoutFormActions';
import { toDropdownSelection } from '@/lib/utils/toDropdownSelection';
import { InputField } from '../ui/Fields/InputFields';
import { SelectField } from '../ui/Fields/SelectFields';
import { Message } from '../ui/Message';

export const UserInfoCheckoutForm = ({
  cartId,
  countries,
}: {
  cartId: string;
  countries: CodedField[];
}) => {
  const t = useTranslations('components.cart');
  const {
    successMessage,
    errorMessage,
    errorFields,
    isSubmitting,
    handleSubmit,
  } = useCheckoutForm(cartId);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-neutral text-neutral-content">
      <div className="container mx-auto max-w-2xl px-5 py-10">
        <h1 className="mb-6 text-4xl font-bold text-primary">
          {t('shippingAddress')}
        </h1>
        <form onSubmit={onSubmit} method="post" className="mt-6 space-y-4">
          <InputField
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name*"
            error={errorFields?.firstName}
          />
          <InputField
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name*"
            error={errorFields?.lastName}
          />
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Email Address*"
            error={errorFields?.email}
          />
          <InputField
            type="text"
            id="address"
            name="address"
            placeholder="Street Address*"
            error={errorFields?.address}
          />
          <InputField
            type="text"
            id="city"
            name="city"
            placeholder="City*"
            error={errorFields?.city}
          />
          <InputField
            type="text"
            id="stateProvince"
            name="stateProvince"
            placeholder="State/Province*"
            error={errorFields?.stateProvince}
          />
          <InputField
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal Code*"
            error={errorFields?.postalCode}
          />
          <SelectField
            name="countryId"
            id="countryId"
            options={countries.map(toDropdownSelection)}
            placeholder="Select a country*"
            error={errorFields?.countryId}
          />

          <Message message={successMessage} type="success" />
          <Message message={errorMessage} type="error" />

          <div className="mt-6 flex space-x-4">
            <Link href="/cart" className="btn btn-secondary flex-1">
              {t('backToCart')}
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('redirecting') : t('proceedToPayment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
