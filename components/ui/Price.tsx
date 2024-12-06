import clsx from 'clsx';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/utils';

export function Price({
  price,
  className,
  currencyCode = 'EUR',
  locale = 'en-US',
}: {
  price: Product['price'];
  className?: string;
  currencyCode?: string;
  locale?: string;
}) {
  return (
    <p className={clsx('flex items-center', className)}>
      {formatPrice({ price, locale, currencyCode })}
    </p>
  );
}
