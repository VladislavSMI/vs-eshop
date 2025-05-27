import clsx from 'clsx';
import { Product } from '@/lib/types';
import { Price } from '@/components/ui/Price';

export const ProductCardInfo = ({
  name,
  price,
  currencyCode = 'EUR',
  position,
}: {
  name: Product['productName'];
  price: Product['price'];
  currencyCode?: string;
  position: 'bottom' | 'center';
}) => (
  <div
    className={clsx('absolute bottom-0 w-full p-2', {
      'left-0 lg:w-[75%] lg:pb-[25%]': position === 'center',
    })}
  >
    <div className="flex items-center rounded-lg border border-neutral bg-neutral/80 p-2 text-sm font-semibold text-white backdrop-blur-md">
      <h3 className="mr-4 flex-grow truncate pl-2">{name}</h3>
      <Price
        className="flex-none rounded-lg bg-accent p-2 text-secondary"
        price={price}
        currencyCode={currencyCode}
      />
    </div>
  </div>
);
