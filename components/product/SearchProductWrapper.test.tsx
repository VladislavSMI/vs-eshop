import React from 'react';
import { useInView } from 'react-intersection-observer';
import { render, screen, waitFor } from '@testing-library/react';
import { useSearchProducts } from '@/lib/hooks/useSearchProduct';
import { mockProducts } from '@/__test__/mocks/ProductRepositoryMocks';
import { SearchProductWrapper } from './SearchProductWrapper';

jest.mock('react-intersection-observer', () => ({ useInView: jest.fn() }));
jest.mock('@/lib/hooks/useSearchProduct', () => ({
  useSearchProducts: jest.fn(),
}));

jest.mock('./ProductCard/ProductCardWrapper', () => ({
  ProductCardWrapper: ({ product }: { product: { productId: string } }) => (
    <div data-testid="product">{product.productId}</div>
  ),
}));

const mockFetchNext = jest.fn();

function renderWrapper({
  inView,
  hasNextPage,
  isFetchingNextPage,
}: {
  inView: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  // stub the intersection-observer hook
  (useInView as jest.MockedFunction<typeof useInView>).mockReturnValue({
    ref: jest.fn(),
    inView,
    entry: undefined,
  } as unknown as ReturnType<typeof useInView>);

  // stub the infinite-query hook
  (
    useSearchProducts as jest.MockedFunction<typeof useSearchProducts>
  ).mockReturnValue({
    data: { pages: [mockProducts], pageParams: ['initial'] },
    fetchNextPage: mockFetchNext,
    hasNextPage,
    isFetchingNextPage,
  } as unknown as ReturnType<typeof useSearchProducts>);

  render(<SearchProductWrapper products={mockProducts} searchParams={{}} />);
}

describe('<SearchProductWrapper>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows one product card for every item passed in', () => {
    renderWrapper({
      inView: false,
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    expect(screen.getAllByTestId('product')).toHaveLength(mockProducts.length);
  });

  it('loads the next page when the user scrolls to the sentinel', async () => {
    renderWrapper({
      inView: true,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
    await waitFor(() => expect(mockFetchNext).toHaveBeenCalledTimes(1));
  });

  it('does not trigger another load while a page is already loading', () => {
    renderWrapper({
      inView: true,
      hasNextPage: true,
      isFetchingNextPage: true,
    });
    expect(mockFetchNext).not.toHaveBeenCalled();
  });

  it('does not trigger a load when all products have been fetched', () => {
    renderWrapper({
      inView: true,
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    expect(mockFetchNext).not.toHaveBeenCalled();
  });
});
