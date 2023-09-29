import { Col, Row, Statistic } from 'antd';
import { useMemo } from 'react';
import { IProduct } from '../../types';

interface IAllProductStats {
  products: IProduct[];
}

const AllProductStats: React.FC<IAllProductStats> = ({ products }) => {
  const totalProductValue = useMemo(() => {
    const totalVal = products?.reduce(
      (acc: number, curr: IProduct) => acc + curr.stock * curr.price,
      0
    );

    return totalVal;
  }, [products]);

  const productCount = products?.length;

  return (
    <Row justify='center' align='middle'>
      <Col span={12}>
        <Statistic title='Total value' value={`${totalProductValue}$`} />
      </Col>
      <Col span={12}>
        <Statistic title='Total products' value={productCount} />
      </Col>
    </Row>
  );
};

export default AllProductStats;
