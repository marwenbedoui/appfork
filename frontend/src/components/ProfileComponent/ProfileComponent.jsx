import React, { useState } from "react";
import { Avatar, Row, Col, Space } from "antd";
import "./ProfileComponent.css";
import ModalComponent from "../ModalComponent";

function ProfileComponent() {
  const [email, setEmail] = useState("jane.doe@example.com");
  const [location, setLocation] = useState("New York City");
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleEmailModalOk = () => {
    setEmail(newEmail);
    setEmailModalVisible(false);
  };

  const handleLocationModalOk = () => {
    setLocation(newLocation);
    setLocationModalVisible(false);
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
                    <Avatar
                      className="profile-picture"
                      size={128}
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    />
                  </Col>
                  <Col span={12}>
                    <div className="profile-info">
                      <h2 className="profile-name">Jane Doe</h2>
                      <p className="profile-email">
                        Email: jane.doe@example.com
                      </p>
                      <p className="profile-location">Role : Tester</p>
                    </div>
                  </Col>
                </Row>

                <div className="profile-bio">
                  <Space>
                    <ModalComponent
                      changed={"email"}
                      pass={false}
                    ></ModalComponent>
                    <ModalComponent
                      changed={"password"}
                      pass={true}
                    ></ModalComponent>
                  </Space>

                  {/* <Modal
                    title="Edit Email"
                    visible={emailModalVisible}
                    onOk={handleEmailModalOk}
                    onCancel={() => setEmailModalVisible(false)}
                  >
                    <Input
                      placeholder="Enter new email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </Modal>

                  <Modal
                    title="Edit Location"
                    visible={locationModalVisible}
                    onOk={handleLocationModalOk}
                    onCancel={() => setLocationModalVisible(false)}
                  >
                    <Input
                      placeholder="Enter new location"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                  </Modal> */}
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
