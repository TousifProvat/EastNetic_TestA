import { fireEvent, render, screen } from '@testing-library/react';
import Userevents from '@testing-library/user-event';

import AddProductModal from './AddProductModal';

describe('<AddProductModal/>', () => {
  it('should show the modal', () => {
    render(
      <AddProductModal visible onCancel={() => {}} submitHandler={() => {}} />
    );

    expect(screen.getByText(/Add new product/)).toBeInTheDocument();
  });

  it('should show modal and add product form', () => {
    render(
      <AddProductModal visible onCancel={() => {}} submitHandler={() => {}} />
    );

    expect(screen.getByTestId('add-product-form')).toBeInTheDocument();
  });

  it('should show modal and click cancel button', () => {
    const handleClose = jest.fn();

    render(
      <AddProductModal
        visible
        onCancel={handleClose}
        submitHandler={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Cancel', { exact: true }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should fill the add product form and submit', async () => {
    const mockSubmit = jest.fn();

    const user = Userevents.setup();

    render(
      <AddProductModal visible onCancel={() => {}} submitHandler={mockSubmit} />
    );

    await user.type(screen.getByTestId('product-name'), 'Samsung TV');
    await user.type(
      screen.getByTestId('product-description'),
      '4k TV, HD quality'
    );
    await user.type(screen.getByTestId('product-price'), '10000');

    await user.clear(screen.getByTestId('product-stock'));
    await user.type(screen.getByTestId('product-stock'), '10');

    await user.click(screen.getByTestId('add-product'));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'Samsung TV',
      description: '4k TV, HD quality',
      price: 10000,
      stock: 10,
    });
  });
});
