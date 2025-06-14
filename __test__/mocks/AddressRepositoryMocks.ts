import type { Address } from '@/lib/types';
import type { AddressRow } from '@/data/QueryResults';

export const mockAddress: Address = {
  id: '',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  address: '456 Elm St',
  city: 'Othertown',
  stateProvince: 'NY',
  postalCode: '67890',
  countryId: 42,
  countryName: '',
};

export const mockAddressRow: AddressRow = {
  address_id: 'addr-123',
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane.smith@example.com',
  address: '456 Elm St',
  city: 'Othertown',
  state_province: 'NY',
  postal_code: '67890',
  country_id: 42,
  country_name: 'Utopia',
};

export const mockMappedAddress: Address = {
  id: 'addr-123',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  address: '456 Elm St',
  city: 'Othertown',
  stateProvince: 'NY',
  postalCode: '67890',
  countryId: 42,
  countryName: 'Utopia',
};
