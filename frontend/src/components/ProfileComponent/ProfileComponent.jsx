import React, { useEffect, useState } from "react";
import { Avatar, Row, Col, Space, Button } from "antd";
import "./ProfileComponent.css";
import ProfileServices from "../../services/ProfileServices";
import InfoModal from "../ProfileForms/InfoModal";
import EmailModal from "../ProfileForms/EmailModal";
import PasswordModal from "../ProfileForms/PasswordModal";

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
                    <Avatar
                      className="profile-picture"
                      size={128}
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    />
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
