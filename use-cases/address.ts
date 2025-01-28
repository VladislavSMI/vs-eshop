'use Server';

import { upsertShippingAddress } from '@/data/repository/AddressRepository';
import { Address } from '@/lib/types';

export async function findOrCreateShippingAddressUseCase(
  shippingAddress: Address,
): Promise<Address> {
  return await upsertShippingAddress(shippingAddress);
}
