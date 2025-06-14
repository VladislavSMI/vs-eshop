import { PublicError } from '@/lib/errors/PublicError';
import { upsertShippingAddress } from '@/data/repository/AddressRepository';
import { log } from '@/lib/logging/log';
import { printException } from '@/lib/utils/utils';
import { mockAddress } from '@/__test__/mocks/AddressRepositoryMocks';
import { findOrCreateShippingAddressUseCase } from './address';

jest.mock('@/lib/db', () => ({}));
jest.mock('@/data/repository/AddressRepository');
jest.mock('@/lib/logging/log');
jest.mock('@/lib/utils/utils');

const mockUpsert = jest.mocked(upsertShippingAddress);
const mockLogError = jest.mocked(log.error);
const mockPrintException = jest.mocked(printException);

describe('findOrCreateShippingAddressUseCase()', () => {
  beforeEach(() => jest.resetAllMocks());

  it('returns the saved / found address when the repository succeeds', async () => {
    mockUpsert.mockResolvedValue(mockAddress);

    const result = await findOrCreateShippingAddressUseCase(mockAddress);

    expect(mockUpsert).toHaveBeenCalledWith(mockAddress);
    expect(result).toBe(mockAddress);
  });

  it('wraps repository failures in PublicError and logs the details', async () => {
    const dbFailure = new Error('DB connection lost');
    mockUpsert.mockRejectedValue(dbFailure);
    mockPrintException.mockReturnValue('Error: DB connection lost');

    await expect(
      findOrCreateShippingAddressUseCase(mockAddress),
    ).rejects.toBeInstanceOf(PublicError);

    expect(mockLogError).toHaveBeenCalledWith(
      {
        shippingAddress: mockAddress,
        error: 'Error: DB connection lost',
      },
      'Error occurred while finding or creating shipping address',
    );
  });
});
