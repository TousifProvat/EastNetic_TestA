import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Col, Row, Space, Statistic, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import AddProductModal, {
  AddProductFieldType,
} from './components/Modal/AddProductModal';
import ProductCard from './components/ProductCard';
import { IProduct } from './types';

const countQuery = gql`
  query CountQuery {
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const getAllProductsQuery = gql`
  query GetAllProducts {
    products {
      id
      name
      price
      stock
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
  const { data } = useQuery(countQuery);

  const { data: AllProduct } = useQuery(getAllProductsQuery);

  const [addProduct, { loading }] = useMutation<AddProductFieldType>(
    ADD_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: getAllProductsQuery }, { query: countQuery }],
    }
  );

  const totalValofProducts = useMemo(() => {
    const totalVal = AllProduct?.products?.reduce(
      (acc: number, curr: IProduct) => acc + curr.stock * curr.price,
      0
    );

    return totalVal;
  }, [AllProduct?.products]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const hideModal = () => {
    setShowAddProductModal(false);
  };

  const addProductHandler = async (values: AddProductFieldType) => {
    try {
      message.loading('Adding product...');
      await addProduct({ variables: values });
      setShowAddProductModal(false);
      message.destroy();
    } catch (err: unknown) {
      message.error('Seomthing went wrong');
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
        <Row justify='center' align='middle'>
          <Col span={12}>
            <Statistic title='Total value' value={totalValofProducts} />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total products'
              value={data?.products_aggregate?.aggregate.count}
            />
          </Col>
        </Row>

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

        <Row justify='center' gutter={[32, 23]}>
          {AllProduct?.products?.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
            />
          ))}
        </Row>
      </Space>
    </>
  );
}
