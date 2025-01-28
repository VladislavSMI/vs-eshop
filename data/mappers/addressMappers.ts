import { Address } from '@/lib/types';
import { AddressRow } from '@/data/QueryResults';

const mapAddress = (row: AddressRow): Address => ({
  id: row.address_id,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  address: row.address,
  city: row.city,
  stateProvince: row.state_province,
  postalCode: row.postal_code,
  countryId: row.country_id,
  countryName: row.country_name,
});

const mapAddresses = (rows: AddressRow[]): Address[] => rows.map(mapAddress);

export const AddressMappers = {
  mapAddress,
  mapAddresses,
};
