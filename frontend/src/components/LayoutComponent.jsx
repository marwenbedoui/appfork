import {
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, theme, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { useState } from "react";
import ProfileServices from "../services/ProfileServices";
import base64js from "base64-js";
import "./styles/ProfileComponent.css";

const { Content, Footer, Sider } = Layout;

const LayoutComponent = ({ headerLogo, mainContent, currentPage, role }) => {
  const data = [
    {
      icon: DashboardOutlined,
      label: "Tableau de bord",
      clickEvent: () => {
        window.location.href = `/${role}/accueil`;
      },
    },
    {
      icon: DatabaseOutlined,
      label: "Historique des tests",
      clickEvent: () => {
        window.location.href = `/${role}/historiques`;
      },
    },
    {
      icon: UserOutlined,
      label: "Mon profil",
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
  ];
  if (role === "admin") {
    data.splice(2, 0, {
      icon: UsergroupAddOutlined,
      label: "Utilisateurs",
      clickEvent: () => {
        window.location.href = `/${role}/all-users`;
      },
    });
  }
  const items = data.map((sideBarItem, index) => ({
    key: String(index + 1),
    icon: React.createElement(sideBarItem.icon),
    label: String(sideBarItem.label),
    onClick: sideBarItem.clickEvent,
  }));

  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    ProfileServices.getInfos().then((res) => {
      setUserInfo(res);
      const byteArray = new Uint8Array(res.image.data);
      if (res.image.data.length === 0) {
        setImageUrl(null);
      } else {
        const base64String = base64js.fromByteArray(byteArray);
        setImageUrl(`http://localhost:5000/${atob(base64String)}`);
      }
    });
  }, [userInfo, imageUrl]);

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
              {imageUrl === null ? (
                <Avatar
                  className="profile-picture"
                  size={128}
                  src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
                />
              ) : (
                <Avatar className="profile-picture" size={128} src={imageUrl} />
              )}
            </Col>
            <Col span={24}>
              <Typography.Title
                level={5}
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
            <Col span={24}>
              <div
                style={{
                  textAlign: "center",
                  color: "#ffffffa6",
                  textTransform: "capitalize",
                  marginBottom: "10px",
                }}
              >
                {userInfo.role}
              </div>
            </Col>
          </Row>
        </div>
        <Menu
          style={{
            marginTop: "10px",
          }}
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
            <img
              style={{ height: "30px", marginLeft: "20px" }}
              src={headerLogo}
              alt="logo talan"
            />
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
