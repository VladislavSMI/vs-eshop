import { PaymentType } from '@/lib/types';
import { executeQuery } from 'lib/db';

export async function savePaymentLog({
  externalPaymentId,
  status,
  type,
  message,
}: {
  externalPaymentId: string;
  status: string;
  type: PaymentType;
  message: string;
}) {
  const query = `
    INSERT INTO payment_logs (
      external_payment_id,
      status,
      type,
      message
    )
    VALUES ($1, $2, $3, $4::jsonb)
    ON CONFLICT (external_payment_id, status, type)
    DO UPDATE
      SET message = EXCLUDED.message
  `;

  const values = [externalPaymentId, status, type, message];
  const result = await executeQuery({ query, values });

  return (result.rowCount ?? 0) > 0;
}
