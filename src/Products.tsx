import { PlusOutlined } from '@ant-design/icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Row, Space, message } from 'antd';
import { useState } from 'react';

import AddProductModal, {
  AddProductFieldType,
} from './components/Modal/AddProductModal';
import ProductCard from './components/ProductCard';
import AllProductStats from './components/Stats/AllProductStats';
import { IProduct } from './types';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      price
      stock
      description
    }
  }
`;

const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct(
    $description: String
    $name: String!
    $stock: Int!
    $price: numeric!
  ) {
    insert_products_one(
      object: {
        name: $name
        description: $description
        price: $price
        stock: $stock
      }
    ) {
      id
      name
      stock
      description
      price
    }
  }
`;

export function Products(): JSX.Element {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const { data: AllProduct } = useQuery(GET_ALL_PRODUCTS);

  const [addProduct, { loading }] = useMutation<AddProductFieldType>(
    ADD_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: GET_ALL_PRODUCTS }],
    }
  );

  const hideModal = () => {
    setShowAddProductModal(false);
  };

  const addProductHandler = async (values: AddProductFieldType) => {
    try {
      message.loading('Adding product...');
      await addProduct({ variables: values });
      message.destroy();
      setShowAddProductModal(false);
    } catch (err: any) {
      message.destroy();
      if (err.message) {
        message.error(err.message);
      }
    }
  };

  return (
    <>
      <AddProductModal
        visible={showAddProductModal}
        onCancel={hideModal}
        submitHandler={addProductHandler}
      />
      <Space
        direction='vertical'
        size={40}
        style={{ width: '100%', paddingBottom: '1rem' }}
      >
        <AllProductStats products={AllProduct?.products} />

        <Row justify='end'>
          <Button
            disabled={loading}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setShowAddProductModal(true)}
          >
            Add Product
          </Button>
        </Row>

        <Row gutter={[32, 23]}>
          {AllProduct?.products?.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              description={product.description}
            />
          ))}
        </Row>
      </Space>
    </>
  );
}
