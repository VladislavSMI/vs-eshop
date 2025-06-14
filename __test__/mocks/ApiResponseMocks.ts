import type { ApiResponse } from '@/lib/types';

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  status: 'success',
  details: { code: 'OK', messageKey: 'responseSuccess.orderSuccess' },
  data,
});
export const errorResponse = (code: string): ApiResponse<null> => ({
  status: 'error',
  details: { code, messageKey: 'responseError.orderFailed' },
  data: null,
});
