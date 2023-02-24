import { Form, Input } from "antd";
import React from "react";

export default function EmailForm() {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      <Form.Item label={`Old Email`}>
        <Input disabled placeholder="qwerty@qwert.azer" />
      </Form.Item>

      <Form.Item
        label={`Type new Email`}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="qwerty@qwert.azer" />
      </Form.Item>
      <Form.Item
        label={`Retype new Email`}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="qwerty@qwert.azer" />
      </Form.Item>

      <Form.Item
        label={"Type password"}
        tooltip="This is a required field"
        required
      >
        <Input placeholder="password" type="password" />
      </Form.Item>
    </Form>
  );
}
