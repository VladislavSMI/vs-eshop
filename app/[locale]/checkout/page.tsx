import React from 'react';
import { redirect } from 'next/navigation';
import { UserInfoCheckoutForm } from '@/components/checkout/UserInfoCheckoutForm';
import { fetchCartUseCase } from '@/use-cases/cart';
import { getAllCountriesUseCase } from '@/use-cases/countries';

export default async function CheckoutPage() {
  const cart = await fetchCartUseCase();

  if (!cart || !cart.items.length) {
    redirect('/cart');
  }

  const countries = await getAllCountriesUseCase();

  return <UserInfoCheckoutForm cartId={cart.id} countries={countries} />;
}
