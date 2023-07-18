import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/rooms/');
        const data = await response.json();
        setProducts(data.rooms.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserExists(true);
    }
  }, []);

  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={[16, 16]}>
        {products &&
          products.map((item) => (
            <Col span={6} key={item._id}>
              <Link to={`#`}>
                <Card hoverable cover={<img alt={item.name} src={item.img} />}>
                  <Meta
                    title={item.name}
                    description={
                      <>
                        <p>Giá Tiền: {item.price} VND</p>
                        <p>Mô tả sản phẩm: {item.description}</p>
                        {userExists && <button>Đặt phòng</button>}
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProductPage;
