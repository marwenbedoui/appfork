import React, { useEffect, useState } from "react";
import { Avatar, Upload, Tag, Button } from "antd";
import ProfileServices from "../services/ProfileServices";
import { PasswordModal, EmailModal, InfoModal } from "./Modals";
import {
  UploadOutlined,
  IdcardOutlined,
  MailOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Space, Typography } from "antd";
import { toast } from "react-toastify";
import base64js from "base64-js";
import "./styles/buttons.css";
const { Title } = Typography;

function ProfileComponent() {
  const [modalMailVisible, setModalMailVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
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

  const handleCancelMail = () => {
    setModalMailVisible(false);
  };

  const handleCancelInfo = () => {
    setModalInfoVisible(false);
  };

  const handleCancelPassword = () => {
    setModalPasswordVisible(false);
  };

  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleUpload = () => {
    toast.success(`File uploaded successfully!`);
  };

  const handleRemove = () => {
    setImageUrl(null);
  };

  return (
    <Row
      justify="center"
      style={{ marginTop: "40px", backgroundColor: "#FAFAFA" }}
    >
      <Col span={12}>
        <Row justify="center">
          <div
            style={{
              position: "relative",
              display: "inline-block",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "30px",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {imageUrl === null ? (
              <Avatar
                size={156}
                src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
              />
            ) : (
              <Avatar size={156} src={imageUrl} />
            )}
            {showButton && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Upload
                  name="image"
                  method="put"
                  action="http://localhost:5000/api/v1/update-image"
                  headers={{
                    Authorization: `Bearer ${ProfileServices.token}`,
                  }}
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const isJpgOrPng =
                      file.type === "image/jpeg" || file.type === "image/png";
                    if (!isJpgOrPng) {
                      toast.error("You can only upload JPG/PNG file!");
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      toast.error("Image must smaller than 2MB!");
                    }
                    return isJpgOrPng && isLt2M;
                  }}
                  onChange={(info) => {
                    if (info.file.status === "done") {
                      const byteArray = new Uint8Array(
                        info.file.response.image.data
                      );
                      const base64String = base64js.fromByteArray(byteArray);
                      handleUpload(atob(base64String));
                    }
                  }}
                  onRemove={handleRemove}
                >
                  <UploadOutlined
                    style={{ fontSize: "3rem", color: "white" }}
                  />
                </Upload>
              </div>
            )}
          </div>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: "16px", textTransform: "capitalize" }}
        >
          <Title level={3}>
            {userInfo.lastname} {userInfo.firstname}
          </Title>
        </Row>
        <Row justify="center" style={{ marginTop: "-28px" }}>
          <Title level={4}>{userInfo.email}</Title>
        </Row>
        <Row
          justify="center"
          style={{ marginBottom: "24px", textTransform: "capitalize" }}
        >
          <Tag color="grey">{userInfo.role}</Tag>
        </Row>
        <Divider />

        <Row justify="space-between" style={{ marginTop: "24px" }}>
          <Col span={8}>
            <Space direction="vertical" align="center">
              <Button
                className="profile-button"
                size="large"
                shape="round"
                icon={<IdcardOutlined size={50} />}
                onClick={() => setModalInfoVisible(true)}
              >
                MAJ profil
              </Button>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical" align="center">
              <Button
                className="profile-button"
                size="large"
                shape="round"
                icon={<MailOutlined />}
                onClick={() => setModalMailVisible(true)}
              >
                MAJ email
              </Button>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical" align="center">
              <Button
                className="profile-button"
                size="large"
                shape="round"
                icon={<EyeOutlined />}
                onClick={() => setModalPasswordVisible(true)}
              >
                MAJ mot de passe
              </Button>
            </Space>
          </Col>
        </Row>
        <EmailModal
          info={userInfo}
          onCancel={handleCancelMail}
          visible={modalMailVisible}
        />
        <PasswordModal
          onCancel={handleCancelPassword}
          visible={modalPasswordVisible}
        />
        <InfoModal
          info={userInfo}
          onCancel={handleCancelInfo}
          visible={modalInfoVisible}
        />
        <Divider />
      </Col>
    </Row>
  );
}

export default ProfileComponent;
