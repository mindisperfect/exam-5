import { useContext, useEffect, useState } from "react";
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../../context/AuthContext";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    Cookies.remove(EXPIRE_DATE);
    navigate("/");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{color: "white", padding: "10px 20px", fontSize: "20px"}}>Najot news</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[key]}
          onClick={({ key }) => {
            setKey(key);
          }}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/category",
              icon: <VideoCameraOutlined />,
              label: <Link to="/category">Category</Link>,
            },
            {
              key: "/users",
              icon: <UploadOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/all-posts",
              icon: <UserOutlined />,
              label: <Link to="/all-posts">All posts</Link>,
            },
            {
              icon: <UploadOutlined />,
              label: (
                <Button onClick={logout} type="primary" danger>
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link to="/user-account" style={{marginRight: "50px"}}>
            <Avatar shape="square" size={32} icon={<UserOutlined />} />
          </Link>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }} >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
