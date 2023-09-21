import { gql, useQuery } from '@apollo/client';
import { Button, Col, Row, Space, Statistic } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import AddProductModal from './components/Modal/AddProductModal';
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

export function Products(): JSX.Element {
  const { data } = useQuery(countQuery);

  const { data: AllProduct } = useQuery(getAllProductsQuery);

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

  return (
    <>
      <AddProductModal visible={showAddProductModal} onCancel={hideModal} />
      <Space direction='vertical' size={40}>
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
