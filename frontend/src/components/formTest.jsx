import React, { useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import TesterService from "../services/TesterServices/TesterService";
import { toast } from "react-toastify";

export const FormTest = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await TesterService.executerTest(values);
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
        layout="vertical"
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Test Name"
          name="testName"
          rules={[{ required: true, message: "Please input the test name !!" }]}
        >
          <Input placeholder="Java test" type="text" name="testName" />
        </Form.Item>
        <Form.Item
          label="Protocol"
          name="protocol"
          rules={[{ required: true, message: "Please input the protocol !!" }]}
        >
          <Input placeholder="http-https..." type="text" name="protocol" />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, message: "Please input the URL !!" }]}
        >
          <Input placeholder="google.com" type="text" name="url" />
        </Form.Item>
        <Form.Item
          label="Port"
          name="port"
          rules={[
            {
              required: true,
              message: "Please input the port !!",
            },
          ]}
        >
          <Input placeholder="8888" type="text" name="port" />
        </Form.Item>
        <Form.Item
          label="Path"
          name="path"
          rules={[
            {
              required: true,
              message: "Please input the path !!",
            },
          ]}
        >
          <Input type="text" name="path" placeholder="/about" />
        </Form.Item>

        <Form.Item
          label="Method"
          name="method"
          rules={[
            {
              required: true,
              message: "Please input the method !!",
            },
          ]}
        >
          <Input type="text" name="method" placeholder="POST GET ..." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            {loading ? <Spin /> : "Executer test"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
