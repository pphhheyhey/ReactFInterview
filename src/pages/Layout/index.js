
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const items = [
  {
    key: '/',
    icon: <UserOutlined />,
    label: 'Contact List',
  },
  {
    key: '/contactsForm',
    icon: <PlusOutlined />,
    label: 'Publish Contact',
  }
];


const LayoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 只高亮主路由
  const selectedKey = location.pathname.startsWith('/contactsForm') ? '/contactsForm' : location.pathname;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          items={items}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0', background: '#fff', padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;