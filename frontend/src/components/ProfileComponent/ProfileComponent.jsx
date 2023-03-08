import React, { useEffect, useState } from "react";
import { Avatar, Row, Col, Space, Button, Upload, message } from "antd";
import "./ProfileComponent.css";
import ProfileServices from "../../services/ProfileServices";
import { PasswordModal, EmailModal, InfoModal } from "../Modals";
import { UploadOutlined } from "@ant-design/icons";

function ProfileComponent() {
  const [modalMailVisible, setModalMailVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({});

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

  const handleUpload = (file) => {
    message.success(`${file.name} file uploaded successfully!`);
  };

  useEffect(() => {
    ProfileServices.getInfos().then((res) => setUserInfo(res));
  }, [userInfo]);
  return (
    <div className="profile-page">
      <div className="site-page-header-ghost-wrapper">
        <Row justify="center">
          <Col span={18}>
            <div className="site-page-header-ghost-wrapper-content">
              <div className="profile-container">
                <Row gutter={16} justify="center">
                  <Col span={6}>
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
                      <Avatar
                        className="profile-picture"
                        size={128}
                        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      />
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
                            accept=".jpg,.jpeg,.png"
                            showUploadList={false}
                            onChange={(info) => handleUpload(info.file)}
                          >
                            <UploadOutlined
                              style={{ fontSize: "3rem", color: "white" }}
                            />
                          </Upload>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="profile-info">
                      <h2
                        className="profile-name"
                        style={{ textTransform: "capitalize" }}
                      >
                        {userInfo.lastname} {userInfo.firstname}
                      </h2>
                      <p className="profile-email">Email: {userInfo.email}</p>
                      <p className="profile-location">Role : {userInfo.role}</p>
                    </div>
                  </Col>
                </Row>

                <div className="profile-bio">
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => setModalMailVisible(true)}
                    >
                      Update mail
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setModalPasswordVisible(true)}
                    >
                      Update password
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setModalInfoVisible(true)}
                    >
                      Update info
                    </Button>

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
                  </Space>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProfileComponent;
