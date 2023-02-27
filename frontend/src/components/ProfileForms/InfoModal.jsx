import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProfileServices from "../../services/ProfileServices";

export default function InfoModal({ visible, onCancel, info }) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await ProfileServices.updateInfo(values);
      console.log(response.message);
      onCancel();
      toast.success(response.message);
    } catch (error) {
      console.error(error.response.message);
      toast.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ lastname: info.lastname, firstname: info.firstname }}
      >
        <Form.Item label={`Old Info`}>
          <Input
            disabled
            placeholder={`${info.lastname + " " + info.firstname}`}
          />
        </Form.Item>

        <Form.Item
          label={`Type new lastname`}
          rules={[{ required: true, message: "Lastname is required" }]}
          tooltip="This is a required field"
          name="lastname"
        >
          <Input placeholder="lastname" />
        </Form.Item>
        <Form.Item
          label="Type new firstname"
          rules={[{ required: true, message: "Firstname is required" }]}
          tooltip="This is a required field"
          name="firstname"
        >
          <Input placeholder="firstname" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            {loading ? <Spin /> : "Update Profile"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
