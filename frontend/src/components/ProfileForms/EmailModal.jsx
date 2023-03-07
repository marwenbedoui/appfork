import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import ProfileServices from "../../services/ProfileServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailModal({ visible, onCancel }) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await ProfileServices.updateMail(values);
      onCancel();
      toast.success(response.message);
    } catch (error) {
      //console.error(error.response.data);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Type new email"
          name="newMail"
          rules={[
            { required: true, message: "New email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="new email" />
        </Form.Item>
        <Form.Item
          label="Retype new email"
          name="newMailRetype"
          rules={[
            { required: true, message: "Please retype new email" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newMail") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two emails that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="retype new email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            {loading ? <Spin /> : "Update email"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
