import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { mockProducts } from '@/__test__/mocks/ProductRepositoryMocks';

const sample = mockProducts[0];

const baseProps = {
  name: sample.productName,
  productId: sample.productId,
  price: sample.price,
  position: 'bottom' as const,
  children: <div data-testid="img">Image</div>,
};

describe('<ProductCard>', () => {
  it('lets users open the product page by clicking the name or price (linking ON)', () => {
    render(<ProductCard {...baseProps} useLink />);

    const name = screen.getByRole('heading', { name: sample.productName });
    const price = screen.getByText(`€${sample.price}`);

    expect(name.closest('a')).toHaveAttribute(
      'href',
      `/product/${sample.productId}`,
    );
    expect(price.closest('a')).toHaveAttribute(
      'href',
      `/product/${sample.productId}`,
    );
  });

  it('shows name and price as plain text when linking is disabled (linking OFF)', () => {
    render(<ProductCard {...baseProps} useLink={false} />);

    expect(
      screen.getByRole('heading', { name: sample.productName }).closest('a'),
    ).toBeNull();
    expect(screen.getByText(`€${sample.price}`).closest('a')).toBeNull();
  });

  it('hides the price label entirely when the caller opts out of showing it', () => {
    render(<ProductCard {...baseProps} useLink showPrice={false} />);
    expect(screen.queryByText(`€${sample.price}`)).toBeNull();
  });
});
