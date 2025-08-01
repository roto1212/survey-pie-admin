import { BuildOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items = [
	{
		key: "list",
		icon: <HomeOutlined />,
		label: <Link to="/list">List</Link>,
	},
	{
		key: "builder",
		icon: <BuildOutlined />,
		label: <Link to="/builder">Builder</Link>,
	},
];


function MainLayout({ children, selectedKey, padding = 45 }) {
  const contentStyle = useMemo(() => {
    return {
      padding: padding,
    };
  }, []);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([selectedKey]);


	useEffect(() => {
		const path = location.pathname.split("/")[1];
		setSelectedKeys([path || "list"]);
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
          defaultSelectedKeys={['list']}
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <Content  style={contentStyle} >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
