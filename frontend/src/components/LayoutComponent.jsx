import {
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, theme, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { useState } from "react";
import ProfileServices from "../services/ProfileServices";

const { Content, Footer, Sider } = Layout;

const LayoutComponent = ({ headerLogo, mainContent, currentPage, role }) => {
  const items = [
    {
      icon: DashboardOutlined,
      label: "Tableau de bord",
      clickEvent: () => {
        window.location.href = `/${role}/accueil`;
      },
    },
    {
      icon: DatabaseOutlined,
      label: "Historique",
      clickEvent: () => {
        window.location.href = `/${role}/historiques`;
      },
    },
    {
      icon: UserOutlined,
      label: "Profile",
      clickEvent: () => {
        window.location.href = `/${role}/profile`;
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

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    ProfileServices.getInfos().then((res) => setUserInfo(res));
  }, [userInfo]);
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
          <Row
            style={{
              marginTop: "200px",
              marginBottom: "180px",
            }}
          >
            <Col span={24}>
              <Avatar
                className="profile-picture"
                size={128}
                src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              />
            </Col>
            <Col span={24}>
              <Typography.Title
                level={4}
                italic
                style={{
                  textAlign: "center",
                  color: "#ffffffa6",
                  textTransform: "capitalize",
                }}
              >
                {userInfo.firstname} {userInfo.lastname}
              </Typography.Title>
            </Col>
          </Row>
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
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          Copyrights Talan Tunisie Consulting
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
