import { Form, Input } from "antd";
import React from "react";

export default function InfoForm() {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      <Form.Item label={`Old Info`}>
        <Input disabled placeholder="Jon doe" />
      </Form.Item>

      <Form.Item
        label={`Type new lastname`}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="lastname" />
      </Form.Item>
      <Form.Item
        label="Type new firstname"
        required
        tooltip="This is a required field"
      >
        <Input placeholder="firstname" />
      </Form.Item>
    </Form>
  );
}
