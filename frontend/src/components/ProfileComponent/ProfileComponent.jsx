import React, { useEffect, useState } from "react";
import { Avatar, Row, Col, Space, Button, Upload } from "antd";
import "./ProfileComponent.css";
import ProfileServices from "../../services/ProfileServices";
import { PasswordModal, EmailModal, InfoModal } from "../Modals";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function ProfileComponent() {
  const [modalMailVisible, setModalMailVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [filename, setFilename] = useState("");
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
    try {
      const formData = new FormData();
      formData.append("image", filename);
      ProfileServices.updateImage(formData);

      toast.success(`${file.name} file uploaded successfully!`);
    } catch (error) {}
  };
  
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array())
  );
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
                        src={
                          userInfo.image === "" 
                            ? "https://xsgames.co/randomusers/avatar.php?g=pixel"
                            : `data:image/*;base64,${base64String}`
                        }
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
                            onChange={(info, e) => {
                              handleUpload(info.file);
                              setFilename(e.target.files[0]);
                            }}
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
                      style={{ backgroundColor: "#2596be", color: "white" }}
                    >
                      MAJ email
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setModalPasswordVisible(true)}
                      style={{ backgroundColor: "#2596be", color: "white" }}
                    >
                      MAJ mot de passe
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setModalInfoVisible(true)}
                      style={{ backgroundColor: "#2596be", color: "white" }}
                    >
                      MAJ profil
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
