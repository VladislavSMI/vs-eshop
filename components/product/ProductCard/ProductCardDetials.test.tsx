import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { ProductCardDetails } from '@/components/product/ProductCard/ProductCardDetails';
import { useCartActions } from '@/lib/hooks/useCartActions';
import { hasAvailableSizes } from '@/lib/utils/productUtils';
import { mockProductDetails } from '@/__test__/mocks';

jest.mock('@/lib/hooks/useCartActions', () => ({ useCartActions: jest.fn() }));
jest.mock('next-intl', () => ({ useTranslations: jest.fn() }));
jest.mock('@/lib/utils/productUtils', () => ({ hasAvailableSizes: jest.fn() }));

const mockUpdate = jest.fn();
const mockSetSize = jest.fn();

function stubCartActions(
  override: Partial<ReturnType<typeof useCartActions>> = {},
) {
  (useCartActions as jest.Mock).mockReturnValue({
    isPending: false,
    successMessage: '',
    errorMessage: '',
    errorFields: null,
    updateCartItem: mockUpdate,
    setSelectedSizeId: mockSetSize,
    selectedSizeId: null,
    ...override,
  });
}

describe('<ProductCardDetails>', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((k: string) => k);
  });

  it('renders basic product data (name, category, price, description)', () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(true);
    stubCartActions();

    render(<ProductCardDetails product={mockProductDetails} />);

    expect(
      screen.getByRole('heading', { name: mockProductDetails.productName }),
    ).toBeVisible();
    expect(screen.getByText(mockProductDetails.categoryName)).toBeVisible();
    expect(screen.getByText(`€${mockProductDetails.price}`)).toBeVisible();
    expect(screen.getByText(/pro-grade deck/i)).toBeVisible();
  });

  it('lets the shopper choose a size (enabled) and prevents choosing a sold-out size (disabled)', async () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(true);
    stubCartActions();

    render(<ProductCardDetails product={mockProductDetails} />);

    const size8 = screen.getByRole('button', { name: '8' });
    const size825 = screen.getByRole('button', { name: '8.25' });

    expect(size8).toBeEnabled();
    expect(size825).toBeDisabled();

    await userEvent.click(size8);
    expect(mockSetSize).toHaveBeenCalledWith(8);
  });

  it('use is able to add item with selected size', async () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(true);
    stubCartActions({ selectedSizeId: 8 });

    render(<ProductCardDetails product={mockProductDetails} />);

    await userEvent.click(screen.getByRole('button', { name: 'addToCart' }));

    expect(mockUpdate).toHaveBeenCalledWith({
      cartItemSelection: {
        productId: mockProductDetails.productId,
        sizeId: 8,
        quantity: 1,
      },
      isQtyIncremented: true,
    });
  });

  it('shows field-level errors coming back from the cart hook', () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(true);
    stubCartActions({
      errorFields: { sizeId: 'select-size', quantity: 'invalid-qty' },
    });

    render(<ProductCardDetails product={mockProductDetails} />);

    expect(screen.getByText('select-size')).toBeVisible();
    expect(screen.getByText('invalid-qty')).toBeVisible();
  });

  it('blocks interaction while a request is pending', () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(true);
    stubCartActions({ isPending: true });

    render(<ProductCardDetails product={mockProductDetails} />);

    expect(screen.getByRole('button', { name: 'adding' })).toBeDisabled();
  });

  it('shows an “out of stock” banner when the product has no sellable sizes', () => {
    (hasAvailableSizes as jest.Mock).mockReturnValue(false);
    stubCartActions();

    render(<ProductCardDetails product={mockProductDetails} />);

    expect(screen.getByText('outOfStock')).toBeVisible();
  });
});
