import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileServices from "../../services/ProfileServices";

export default function PasswordModal({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await ProfileServices.updatePassword(values);
      onCancel();
      toast.success(response.message);
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }}
      >
        <Form.Item
          label={"Old password"}
          rules={[{ required: true, message: "New email is required" }]}
          tooltip="This is a required field"
          name="oldPassword"
        >
          <Input.Password placeholder="Type old password" />
        </Form.Item>

        <Form.Item
          label={`Type new password`}
          rules={[{ required: true, message: "Please type your new password" }]}
          tooltip="This is a required field"
          name="newPassword"
        >
          <Input.Password placeholder="Type new password" type="password" />
        </Form.Item>
        <Form.Item
          label={"Retype new password"}
          rules={[
            { required: true, message: "Please retype your new password" },
          ]}
          tooltip="This is a required field"
          name="newPasswordConfirm"
        >
          <Input.Password placeholder="Retype new password" type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            {loading ? <Spin /> : "Update Password"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
