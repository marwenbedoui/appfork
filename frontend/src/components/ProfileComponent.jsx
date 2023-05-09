import React, { useEffect, useState } from "react";
import { Avatar, Upload, Card, Tooltip, Tag, Button } from "antd";
import "./styles/ProfileComponent.css";
import ProfileServices from "../services/ProfileServices";
import { PasswordModal, EmailModal, InfoModal } from "./Modals";
import {
  UploadOutlined,
  MailTwoTone,
  LockTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import base64js from "base64-js";
const { Meta } = Card;

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

  const obj = {
    des: (
      <div>
        <h2
          className="profile-name"
          style={{ textTransform: "capitalize", color: "black" }}
        >
          {userInfo.lastname} {userInfo.firstname}
        </h2>
        <p className="profile-email">Email: {userInfo.email}</p>
        <p className="profile-location">
          Role :{" "}
          <Tag
            color="gold"
            style={{ fontSize: "20px", height: "30px", padding: "3px" }}
          >
            {userInfo.role}
          </Tag>
        </p>
      </div>
    ),
    tit: <div className="profile-bio">Information sur le profil</div>,
  };

  return (
    <Card
      bordered
      style={{
        width: 300,
        border: "1px solid black",
        backgroundColor: "#f0f2f5",
      }}
      cover={
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
              src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
            />
          ) : (
            <Avatar className="profile-picture" size={128} src={imageUrl} />
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
                <UploadOutlined style={{ fontSize: "3rem", color: "white" }} />
              </Upload>
            </div>
          )}
        </div>
      }
      actions={[
        <Tooltip color="cyan" title="Mettre à jour l'adresse mail" key={"cyan"}>
          <Button
            type="primary"
            shape="square"
            icon={
              <MailTwoTone
                key="MailSetting"
                style={{ fontSize: "30px" }}
                twoToneColor="#4682b4"
              />
            }
            size="large"
            style={{
              backgroundColor: "#fff",
            }}
            onClick={() => setModalMailVisible(true)}
            className="button"
          />
        </Tooltip>,
        <Tooltip
          color="lime"
          title="Mettre à jour le mot de passe"
          key={"lime"}
        >
          <Button
            type="primary"
            shape="square"
            icon={
              <LockTwoTone
                key="passwordSetting"
                style={{ fontSize: "30px" }}
                twoToneColor="#4682b4"
              />
            }
            size="large"
            style={{
              backgroundColor: "#fff",
            }}
            onClick={() => setModalPasswordVisible(true)}
            className="button"
          />
        </Tooltip>,
        <Tooltip color="purple" title="Mettre à jour vos info" key={"purple"}>
          <Button
            type="primary"
            shape="square"
            icon={
              <SettingTwoTone
                key="passwordSetting"
                style={{ fontSize: "30px" }}
                twoToneColor="#4682b4"
              />
            }
            size="large"
            style={{
              backgroundColor: "#fff",
            }}
            onClick={() => setModalInfoVisible(true)}
            className="button"
          />
        </Tooltip>,
      ]}
      className="profile-page"
    >
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
      <Meta title={obj.tit} description={obj.des} />
    </Card>
  );
}

export default ProfileComponent;
