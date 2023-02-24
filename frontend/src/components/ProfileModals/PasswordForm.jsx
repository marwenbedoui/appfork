import { Form, Input } from "antd";
import React from "react";

export default function PasswordForm() {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={"Old password"}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="Type old password" type="password" />
      </Form.Item>

      <Form.Item
        label={`Type new password`}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="Type new password" type="password" />
      </Form.Item>
      <Form.Item
        label={"Retype new password"}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="Retype new password" type="password" />
      </Form.Item>
    </Form>
  );
}
