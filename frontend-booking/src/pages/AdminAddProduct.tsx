import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminAddProductPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.categoryId = '6487675d1923987b0eae45fa';

    axios
      .post('http://127.0.0.1:8080/api/rooms/', values)
      .then((response) => {
        message.success('Thêm Sản Phẩm Thành Công !');
        form.resetFields();
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu tới API:', error);
        message.error('Thêm Sản Phẩm Thất Bại !');
      });
  };

  return (
    <div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Tên Sản Phẩm'
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Giá Tiền'
          name='price'
          rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Ảnh'
          name='img'
          rules={[{ required: true, message: 'Vui lòng nhập đường dẫn ảnh!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Mô Tả'
          name='description'
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Thêm Sản Phẩm
          </Button>
          <Button type='default'>
            <Link to='/admin/products'>Quay Lại</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAddProductPage;
