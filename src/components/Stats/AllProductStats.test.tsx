import { render, screen } from '@testing-library/react';
import AllProductStats from './AllProductStats';

describe('<AllProductStats/>', () => {
  const products = [
    {
      id: 1,
      name: 'Samsung 55" TV',
      description: '4k ultra hd quality',
      price: 100,
      stock: 10,
    },
    {
      id: 2,
      name: 'TV speaker',
      description: 'Ultra sound quality',
      price: 30,
      stock: 10,
    },
    {
      id: 3,
      name: 'TV remote',
      description: 'Wireless remote',
      price: 20,
      stock: 10,
    },
  ];

  it('should display total value 1500$ and total products 3', () => {
    render(<AllProductStats products={products} />);

    expect(screen.getByText(/1500\$/)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
