import { executeQuery } from '@/lib/db';
import { Address } from '@/lib/types';
import { AddressMappers } from '../mappers/addressMappers';
import { AddressRow } from '../QueryResults';

/*
  - We have a unique index on (first_name, last_name, email, address, city, state_province, postal_code, country_id).
  - INSERT will either create a new row or, if that combo already exists, update the existing row (using EXCLUDED).
  - We return the final row (new or updated) in one statement
*/
export async function upsertShippingAddress(
  shippingAddress: Address,
): Promise<Address> {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    stateProvince,
    postalCode,
    countryId,
  } = shippingAddress;

  const query = `
    WITH upsert AS (
      INSERT INTO shipping_addresses (
        first_name,
        last_name,
        email,
        address,
        city,
        state_province,
        postal_code,
        country_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (first_name, last_name, email, address, city, state_province, postal_code, country_id)
      DO UPDATE 
        SET
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          email = EXCLUDED.email,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          state_province = EXCLUDED.state_province,
          postal_code = EXCLUDED.postal_code,
          country_id = EXCLUDED.country_id
      RETURNING
        shipping_addresses.address_id,
        shipping_addresses.first_name,
        shipping_addresses.last_name,
        shipping_addresses.email,
        shipping_addresses.address,
        shipping_addresses.city,
        shipping_addresses.state_province,
        shipping_addresses.postal_code,
        shipping_addresses.country_id
    )
    SELECT upsert.*,
          c.name AS country_name
    FROM upsert
    LEFT JOIN countries c ON upsert.country_id = c.id
    LIMIT 1
  `;

  const values = [
    firstName,
    lastName,
    email,
    address,
    city,
    stateProvince,
    postalCode,
    countryId,
  ];

  const { rows } = await executeQuery<AddressRow>({ query, values });

  return AddressMappers.mapAddress(rows[0]);
}
