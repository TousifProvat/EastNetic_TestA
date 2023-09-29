import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal } from 'antd';
import { MouseEvent } from 'react';

interface AddProductModalProps {
  visible: boolean;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  submitHandler: (value: AddProductFieldType) => void;
}

export type AddProductFieldType = {
  name: string;
  price: string;
  stock: string;
  description: string;
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onCancel,
  submitHandler,
}) => {
  const [form] = Form.useForm();

  const hideModal = (e: MouseEvent<HTMLButtonElement>) => {
    onCancel(e);
    form.resetFields();
  };

  const onSubmit = (values: AddProductFieldType) => {
    submitHandler(values);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={visible}
      onCancel={hideModal}
      title='Add new product'
      footer={[
        <Button key='back' onClick={hideModal}>
          Cancel
        </Button>,
        <Button
          data-testid='add-product'
          key='submit'
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => form.submit()}
        >
          Add product
        </Button>,
      ]}
    >
      <Divider />
      <Form
        form={form}
        initialValues={{
          stock: 1,
        }}
        labelCol={{
          span: 7,
        }}
        onFinish={onSubmit}
        data-testid='add-product-form'
      >
        <>
          <Form.Item<AddProductFieldType>
            label='Product name'
            name='name'
            rules={[
              { required: true, message: 'Please input your product name' },
            ]}
          >
            <Input
              placeholder='Ex. Samsung 55" TV'
              data-testid='product-name'
            />
          </Form.Item>
          <Form.Item<AddProductFieldType>
            label='Product description'
            name='description'
          >
            <Input.TextArea rows={5} data-testid='product-description' />
          </Form.Item>
          <Form.Item<AddProductFieldType>
            label='Product price'
            name='price'
            rules={[
              { required: true, message: 'Please input your product price' },
            ]}
          >
            <InputNumber addonAfter='$' data-testid='product-price' />
          </Form.Item>
          <Form.Item<AddProductFieldType>
            label='Product stock'
            name='stock'
            wrapperCol={{
              span: 6,
            }}
            rules={[
              { required: true, message: 'Please input your product price' },
            ]}
          >
            <InputNumber data-testid='product-stock' />
          </Form.Item>
        </>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
