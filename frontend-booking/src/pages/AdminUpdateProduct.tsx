import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Upload, message } from 'antd';
import { IProduct } from './../interfaces/product';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  products: IProduct[];
  onUpdate: (product: IProduct) => void;
}

const AdminUpdateProduct = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    const currentProduct = props.products.find(
      (product: IProduct) => product._id === id
    );

    setProduct(currentProduct);
  }, [props, id]);

  useEffect(() => {
    if (product) {
      setFields();
    }
  }, [product]);

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      description: product?.description,
    });
  };

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/rooms/${values._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        props.onUpdate(updatedProduct);
        message.success('Cập Nhật Sản Phẩm Thành Công !');
        navigate('/admin/products');
      } else {
        message.error('Cập Nhật Sản Phẩm Thất Bại !');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu tới API:', error);
      message.error('Cập Nhật Sản Phẩm Thất Bại !');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed', errorInfo);
  };

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item label='Id' name='_id' style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Price' name='price'>
          <InputNumber />
        </Form.Item>
        <Form.Item label='image' name='image'>
          <Input />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit'>Sửa</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminUpdateProduct;
