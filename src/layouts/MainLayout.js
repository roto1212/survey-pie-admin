import { BuildOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: 'list',
    icon: <HomeOutlined />,
    label: <Link to="/list">List</Link>,
  },
  {
    key: 'builder',
    icon: <BuildOutlined />,
    label: <Link to="/builder">Builder</Link>,
  },
];

function MainLayout({ children, selectedKey }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([selectedKey]);

  useEffect(() => {
    setSelectedKeys([location.pathname.split('/')[1]]);
  }, [location]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div
          className="demo-logo-vertical"
          style={{
            height: '32px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '16px',
          }}
        />
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
