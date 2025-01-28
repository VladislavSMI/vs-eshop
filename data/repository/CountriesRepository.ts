import { executeQuery } from '@/lib/db';
import { CountryRow } from '../QueryResults';
import { Country } from '@/lib/types';

export async function getAllCountries(): Promise<Country[]> {
  const query = `
    SELECT * FROM countries;
  `;

  const data = await executeQuery<CountryRow>({ query });

  return data.rows.map(({ id, code, name }) => ({
    id,
    code,
    name,
  }));
}
