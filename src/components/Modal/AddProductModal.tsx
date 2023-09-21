import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal, Space } from 'antd';
import { MouseEvent } from 'react';

interface AddProductModalProps {
  visible: boolean;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
}

type AddProductFieldType = {
  name: string;
  price: string;
  stock: string;
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: AddProductFieldType) => {
    console.log(values);
  };

  const hideModal = (e: MouseEvent<HTMLButtonElement>) => {
    onCancel(e);
    form.resetFields();
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={hideModal}
      title='Add new product'
      footer={[
        <Button key='back' onClick={hideModal}>
          Cancel
        </Button>,
        <Button
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
        onFinish={onSubmit}
      >
        <Space.Compact direction='vertical'>
          <Form.Item<AddProductFieldType>
            label='Product name'
            name='name'
            rules={[
              { required: true, message: 'Please input your product name' },
            ]}
          >
            <Input placeholder='Ex. Samsung 55" TV' />
          </Form.Item>
          <Form.Item<AddProductFieldType>
            label='Product price'
            name='price'
            rules={[
              { required: true, message: 'Please input your product price' },
            ]}
          >
            <InputNumber addonAfter='$' />
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
            <InputNumber />
          </Form.Item>
        </Space.Compact>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
