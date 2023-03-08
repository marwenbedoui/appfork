import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminServices from "../services/AdminServices/AdminServices";

function AddUserForm({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await AdminServices.addUser(values);
      onCancel();
      console.log(response);
      if (response.error) {
        toast.error(response.error);
      } else if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          passwordVerify: "",
          role: "",
        }}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              label="Type firstname"
              name="firstname"
              rules={[
                { required: true, message: "Firstname is required" },
                { type: "text", message: "Please enter a name" },
              ]}
            >
              <Input placeholder="Jon" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Type lastname"
              name="lastname"
              rules={[
                { required: true, message: "Lastname is required" },
                { type: "text", message: "Please enter a name" },
              ]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Type email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="jon.doe@jon.doe" />
        </Form.Item>
        <Form.Item
          label="Type the password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item
          label="Type the password"
          name="passwordVerify"
          rules={[
            { required: true, message: "Please retype password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The two passwords that you entered does not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="retype password" />
        </Form.Item>
        <Form.Item
          label="Choose a role for the new user"
          name="role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select
            options={[
              {
                value: "tester",
                label: "Tester",
              },
              {
                value: "simpleUser",
                label: "Simple User",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            {loading ? <Spin /> : "Add new user"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUserForm;
