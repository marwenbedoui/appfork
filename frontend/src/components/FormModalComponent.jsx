import { Form, Input } from "antd";
import React from "react";

export default function FormModalComponent({ changed, pass }) {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      {!pass ? (
        <Form.Item label={`Old ${changed}`} tooltip="This is a required field">
          <Input disabled placeholder="qwerty@qwert.azer" />
        </Form.Item>
      ) : (
        <Form.Item
          label={`Old ${changed}`}
          required
          tooltip="This is a required field"
        >
          <Input placeholder="Type old password" type="password" />
        </Form.Item>
      )}

      <Form.Item
        label={`Type new ${changed}`}
        required
        tooltip="This is a required field"
      >
        {!pass ? (
          <Input placeholder="qwerty@qwert.azer" />
        ) : (
          <Input placeholder="Type new password" type="password" />
        )}
      </Form.Item>
      <Form.Item
        label={`Retype new ${changed}`}
        required
        tooltip="This is a required field"
      >
        {!pass ? (
          <Input placeholder="qwerty@qwert.azer" />
        ) : (
          <Input placeholder="Retype new password" type="password" />
        )}
      </Form.Item>
      {!pass && (
        <Form.Item
          label={"Type password"}
          tooltip="This is a required field"
          required
        >
          <Input placeholder="password" type="password" />
        </Form.Item>
      )}
    </Form>
  );
}
