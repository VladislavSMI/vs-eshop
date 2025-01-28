import { executeQuery } from 'lib/db';
import { Order, PaymentStatus } from '@/lib/types';

export async function savePayment({
  orderId,
  externalPaymentId,
  status,
  amount,
}: {
  orderId: Order['id'];
  externalPaymentId: string;
  status: PaymentStatus;
  amount: number;
}): Promise<boolean> {
  const query = `
    INSERT INTO payments (
      order_id,
      external_payment_id,
      status,
      amount
    )
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (external_payment_id)
    DO UPDATE SET
      status = EXCLUDED.status
  `;

  const values = [orderId, externalPaymentId, status, amount];

  const data = await executeQuery({ query, values });

  return (data.rowCount ?? 0) > 0;
}
