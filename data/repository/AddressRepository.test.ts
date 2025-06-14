import { executeQuery } from '@/lib/db';
import { upsertShippingAddress } from '@/data/repository/AddressRepository';
import { AddressMappers } from '@/data/mappers/addressMappers';
import { QueryResult } from 'pg';
import {
  mockAddress,
  mockAddressRow,
  mockMappedAddress,
} from '@/__test__/mocks/AddressRepositoryMocks';

jest.mock('@/lib/db', () => ({ executeQuery: jest.fn() }));
jest.mock('@/data/mappers/addressMappers', () => ({
  AddressMappers: { mapAddress: jest.fn() },
}));

const mockExecuteQuery = jest.mocked(executeQuery);
const mockAddressMapper = jest.mocked(AddressMappers.mapAddress);

describe('upsertShippingAddress()', () => {
  beforeEach(() => jest.resetAllMocks());

  it('it returns the mapped address', async () => {
    const fakeResult = {
      command: 'INSERT',
      rowCount: 1,
      oid: 0,
      fields: [],
      rows: [mockAddressRow],
    } as unknown as QueryResult<typeof mockAddressRow>;

    mockExecuteQuery.mockResolvedValue(fakeResult);
    mockAddressMapper.mockReturnValue(mockMappedAddress);

    const out = await upsertShippingAddress(mockAddress);

    expect(mockExecuteQuery).toHaveBeenCalledTimes(1);
    expect(mockAddressMapper).toHaveBeenCalledWith(mockAddressRow);
    expect(out).toBe(mockMappedAddress);
  });

  it('propagates DB errors', async () => {
    mockExecuteQuery.mockRejectedValue(new Error('db-down'));
    await expect(upsertShippingAddress(mockAddress)).rejects.toThrow('db-down');
  });
});
