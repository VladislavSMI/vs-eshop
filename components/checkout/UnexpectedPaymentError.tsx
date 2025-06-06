import { CONST } from '@/lib/const';
import { UnexpectedError } from '../ui/UnexpectedError';

interface UnexpectedErrorProps {
  orderId?: string | null;
  sessionId?: string | null;
  message: string;
  contactSupport: string;
  returnHome: string;
}

export const UnexpectedPaymentError = ({
  orderId,
  sessionId,
  message,
  contactSupport,
  returnHome,
}: UnexpectedErrorProps) => (
  <UnexpectedError
    message={message}
    contactSupport={contactSupport}
    mailto={`mailto:${CONST.supportEmail}?subject=Payment%20Issue`}
    returnHome={returnHome}
  >
    {orderId && (
      <p className="text-md mt-4 text-secondary-content">
        <strong>Order ID:</strong> {orderId}
      </p>
    )}

    {sessionId && (
      <p className="text-md mt-2 text-secondary-content">
        <strong>Transaction ID:</strong>
        <span
          className="block max-w-full overflow-hidden truncate text-ellipsis text-xs"
          title={sessionId}
        >
          {sessionId}
        </span>
      </p>
    )}
  </UnexpectedError>
);
