import { getAllCountries } from '@/data/repository/CountriesRepository';
import { Country } from '@/lib/types';

export async function getAllCountriesUseCase(): Promise<Country[]> {
  return getAllCountries();
}
