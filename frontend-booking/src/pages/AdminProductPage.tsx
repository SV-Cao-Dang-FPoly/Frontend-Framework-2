import React, { useState, useEffect } from 'react';
import {
  Space,
  Table,
  Button,
  Input,
  Image,
  Popconfirm,
  Breadcrumb,
  message,
} from 'antd';
import { Link } from 'react-router-dom';

const AdminProductPage = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/rooms');
      const data = await response.json();
      setProducts(data.rooms.data || []);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const removeProduct = async (_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/rooms/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Xóa Sản Phẩm Thành Công !');
        setProducts(products.filter((product) => product._id !== _id));
      } else {
        message.error('Xóa Sản Phẩm Thất Bại !');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/admin/products/${record._id}/update`}>{text}</Link>
      ),
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'img',
      key: 'img',
      render: (url) => <Image width={80} src={url} />,
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Danh Mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (text) => <span>{text ? text.name : ''}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size='middle'>
          <Popconfirm
            placement='top'
            title='Bạn có muốn xóa không ?'
            onConfirm={() => removeProduct(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Xóa Sản Phẩm
            </Button>
          </Popconfirm>

          <Button type='primary'>
            <Link to={`/admin/products/${record._id}/update`}>
              Cập Nhập Sản Phẩm
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/admin'>Trang Chủ</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key='products'>Sản Phẩm</Breadcrumb.Item>,
  ];

  return (
    <div>
      <Input.Search
        placeholder='Tìm Kiếm'
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button type='primary'>
        <Link to={'/admin/products/add'}>Thêm Sản Phẩm</Link>
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record._id}
      />

      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default AdminProductPage;
