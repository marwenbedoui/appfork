import {
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
const { Content, Footer, Sider } = Layout;

const items = [
  {
    icon: DashboardOutlined,
    label: "Tableau de bord",
    clickEvent: () => {
      window.location.href = "/testeur/accueil";
    },
  },
  {
    icon: DatabaseOutlined,
    label: "Historique",
    clickEvent: () => {
      window.location.href = "/testeur/historiques";
    },
  },
  {
    icon: UserOutlined,
    label: "Profile",
    clickEvent: () => {
      window.location.href = "/testeur/profile";
    },
  },
  {
    icon: LogoutOutlined,
    label: "Déconnexion",
    clickEvent: () => {
      localStorage.clear();
      window.location.href = "/login";
    },
  },
].map((sideBarItem, index) => ({
  key: String(index + 1),
  icon: React.createElement(sideBarItem.icon),
  label: String(sideBarItem.label),
  onClick: sideBarItem.clickEvent,
}));

const layoutComponent = ({ headerLogo, mainContent, currentPage }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#000",
            }}
            //TODO : ADD Profile Picture
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentPage]}
          items={items}
        />
      </Sider>

      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              height: "50px",
              margin: "7px",
            }}
          >
            <img style={{ height: "50px" }} src={headerLogo} alt="logo talan" />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <div>{mainContent}</div>
          </div>
        </Content>
        <Footer
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
          }}
        >
          Copyrights Talan Tunisie Consulting
        </Footer>
      </Layout>
    </Layout>
  );
};
export default layoutComponent;
