import { render, screen } from '@testing-library/react';
import { ProductCardInfo } from '@/components/product/ProductCard/ProductCardInfo';

describe('ProductCardInfo', () => {
  it('renders name and price', () => {
    render(<ProductCardInfo name="Wheels" price={49.99} position="bottom" />);
    expect(screen.getByText('Wheels')).toBeInTheDocument();
    expect(screen.getByText(/49\.99/)).toBeInTheDocument();
  });

  it('applies center styles when position="center"', () => {
    const { container } = render(
      <ProductCardInfo name="Skate" price={79.5} position="center" />,
    );
    expect(container.firstChild).toHaveClass('left-0', 'lg:pb-[25%]');
  });
});
