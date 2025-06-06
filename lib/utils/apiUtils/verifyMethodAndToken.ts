import { CONST } from '@/lib/const';
import { log } from '@/lib/logging/log';

export const verifyMethodAndToken = ({
  token,
  tokenKey,
  method,
  expectedMethod = 'POST',
  apiEndpoint,
}: {
  token: string;
  tokenKey: keyof typeof CONST.apiTokens;
  method: string;
  expectedMethod: string;
  apiEndpoint: string;
}) => {
  const endpointLogger = log.child({ apiEndpoint });

  if (token !== CONST.apiTokens[tokenKey]) {
    endpointLogger
      .child({ tokenKey, providedToken: token })
      .warn('Invalid token – cancelling request');
    return false;
  }

  if (method !== expectedMethod) {
    endpointLogger
      .child({ method, expectedMethod })
      .warn('Invalid HTTP method – cancelling request');
    return false;
  }

  return true;
};
