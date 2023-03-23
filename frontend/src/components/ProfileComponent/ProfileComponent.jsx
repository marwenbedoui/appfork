import React, { useEffect, useState } from "react";
import { Avatar, Row, Col, Space, Button, Upload } from "antd";
import "./ProfileComponent.css";
import ProfileServices from "../../services/ProfileServices";
import { PasswordModal, EmailModal, InfoModal } from "../Modals";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import base64js from "base64-js";

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
                      {imageUrl === null ? (
                        <Avatar
                          className="profile-picture"
                          size={128}
                          src={
                            "https://xsgames.co/randomusers/avatar.php?g=pixel"
                          }
                        />
                      ) : (
                        <Avatar
                          className="profile-picture"
                          size={128}
                          src={imageUrl}
                        />
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
                          {/* <Upload
                            accept=".jpg,.jpeg,.png"
                            showUploadList={false}
                            onChange={(e) => {
                              setFilename(e.file);
                              handleUpload(e.file);
                            }}
                          >
                            <UploadOutlined
                              style={{ fontSize: "3rem", color: "white" }}
                            />
                          </Upload> */}
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
                                file.type === "image/jpeg" ||
                                file.type === "image/png";
                              if (!isJpgOrPng) {
                                toast.error(
                                  "You can only upload JPG/PNG file!"
                                );
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
                                const base64String =
                                  base64js.fromByteArray(byteArray);
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
