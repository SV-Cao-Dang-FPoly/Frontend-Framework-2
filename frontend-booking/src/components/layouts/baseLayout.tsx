import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

const BaseLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout>
      <Header style={{ backgroundColor: '#f0f2f5' }}>
        <div className='logo' style={{ float: 'left' }}>
          <h2 style={{ margin: '0' }}>DUCHOANG</h2>
        </div>
        <Menu
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['home']}
          style={{ float: 'right', lineHeight: '64px' }}
        >
          <Menu.Item key='home' icon={<HomeOutlined />}>
            <Link to={'/'}>Trang Chủ</Link>
          </Menu.Item>
          <Menu.Item key='about' icon={<UserOutlined />}>
            <Link to={'/products'}>Sản Phẩm</Link>
          </Menu.Item>
          {user && (
            <>
              <Menu.Item key='user' style={{ float: 'right' }}>
                Xin chào, {user.name || ''}
              </Menu.Item>
              <Menu.Item key='logout' style={{ float: 'right' }}>
                <Button
                  onClick={() => handleLogout()}
                  icon={<LogoutOutlined />}
                >
                  Đăng Xuất
                </Button>
              </Menu.Item>
            </>
          )}
          {!user && (
            <>
              <Menu.Item key='signup' icon={<PhoneOutlined />}>
                <Link to={'/signup'}>Đăng Ký</Link>
              </Menu.Item>
              <Menu.Item key='signin'>
                <Link to={'/signin'}>Đăng Nhập</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content>
        <div
          style={{
            width: '100%',
          }}
        >
          <img
            src='https://img.timviecthietke.com/2021/06/kich-thuoc-banner-website-1-768x251.png'
            alt=''
            style={{ width: '100%' }}
          />
        </div>
      </Content>
      <Outlet />
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} DUCHOANG
      </Footer>
    </Layout>
  );
};

export default BaseLayout;
