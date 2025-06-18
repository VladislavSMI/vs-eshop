'use Server';

import { upsertShippingAddress } from '@/data/repository/AddressRepository';
import { Address } from '@/lib/types';
import { log } from '@/lib/logging/log';
import { printException } from '@/lib/utils/utils';
import { PublicError } from '@/lib/errors/PublicError';

export async function upsertShippingAddressUseCase(
  shippingAddress: Address,
): Promise<Address> {
  try {
    return await upsertShippingAddress(shippingAddress);
  } catch (err) {
    log.error(
      { shippingAddress, error: printException(err) },
      'Error occurred while finding or creating shipping address',
    );

    throw new PublicError({
      code: 'ADDRESS_CREATION_ERROR',
      message:
        'An unexpected error occurred while handling the shipping address.',
      messageKey: 'responseError.unexpected',
    });
  }
}
