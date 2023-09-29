import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface ProductCardProps {
  name: string;
  price: number;
  stock: number;
  description: string | undefined;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <Col xs={24} sm={12} lg={6}>
      <Card title={props.name}>
        <Row gutter={[10, 10]}>
          <Col>
            <Text strong>Product name:</Text>
          </Col>
          <Col>
            <Text data-test>{props.name}</Text>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col>
            <Text strong>Product description:</Text>
          </Col>
          <Col>
            <Text>{props.description}</Text>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col>
            <Text strong>Price:</Text>
          </Col>
          <Col>
            <Text>{props.price}$</Text>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col>
            <Text strong>Stock:</Text>
          </Col>
          <Col>
            <Text>{props.stock} qty</Text>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProductCard;
