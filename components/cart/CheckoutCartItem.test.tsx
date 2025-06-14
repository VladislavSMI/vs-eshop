import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutCartItem } from '@/components/cart/CheckoutCartItem';
import { useCartActions } from '@/lib/hooks/useCartActions';
import { useTranslations } from 'next-intl';
import { mockCartItems } from '@/__test__/mocks/CartMocks';

jest.mock('@/lib/hooks/useCartActions', () => ({
  useCartActions: jest.fn(),
}));
jest.mock('next-intl', () => ({ useTranslations: jest.fn() }));

const mockUpdate = jest.fn();
const mockDelete = jest.fn();

type CartActions = ReturnType<typeof useCartActions>;

const cartActions: CartActions = {
  isPending: false,
  successMessage: '',
  errorMessage: '',
  errorFields: null,
  updateCartItem: mockUpdate,
  deleteCartItem: mockDelete,
  setSelectedSizeId: jest.fn(),
  selectedSizeId: null,
};

function mockCartActions(override: Partial<CartActions> = {}) {
  (useCartActions as jest.Mock).mockReturnValue({
    ...cartActions,
    ...override,
  });
}

describe('<CheckoutCartItem>', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((k: string) => k);
    mockCartActions();
  });

  it('shows the product name, size and calculated line-total to the user', () => {
    render(<CheckoutCartItem cartItem={mockCartItems[0]} />);

    expect(screen.getByRole('heading', { name: /skate deck/i })).toBeVisible();
    expect(screen.getByText(/size:\s*8/i)).toBeVisible();
    expect(screen.getByText('€50.00')).toBeVisible();
  });

  it('lets the user increase the quantity by one', async () => {
    render(<CheckoutCartItem cartItem={mockCartItems[0]} />);

    await userEvent.click(
      screen.getByRole('button', { name: /increase quantity/i }),
    );

    expect(mockUpdate).toHaveBeenCalledWith({
      cartItemSelection: { productId: 'p1', sizeId: 2, quantity: 2 },
      isQtyIncremented: false,
    });
  });

  it('removes the item from the cart when “Remove item” is pressed', async () => {
    render(<CheckoutCartItem cartItem={mockCartItems[0]} />);

    await userEvent.click(screen.getByRole('button', { name: /remove item/i }));

    expect(mockDelete).not.toHaveBeenCalledWith('ci2');
    expect(mockDelete).toHaveBeenCalledWith('ci1');
  });

  it('shows a “Pending…” and disables controls while an update is in flight', () => {
    mockCartActions({ isPending: true });
    render(<CheckoutCartItem cartItem={mockCartItems[0]} />);

    expect(screen.getByText(/pending\.\.\./i)).toBeVisible();
    expect(
      screen.getByRole('button', { name: /increase quantity/i }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /decrease quantity/i }),
    ).toBeDisabled();
  });

  it('surfaces success, general error and field-level error messages from the server', () => {
    mockCartActions({
      successMessage: 'Item added!',
      errorMessage: 'Something went wrong',
      errorFields: { quantity: 'Too many' },
    });
    render(<CheckoutCartItem cartItem={mockCartItems[0]} />);

    const messages = screen
      .getAllByLabelText('message')
      .map((message) => message.textContent);

    expect(messages).toEqual([
      'Item added!',
      'Something went wrong',
      'Too many',
    ]);
  });
});
