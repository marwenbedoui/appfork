import { Button, Form, Input, Modal, Spin, Row, Col, Select } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileServices from "../services/ProfileServices";
import AdminServices from "../services/AdminServices/AdminServices";
import TesterService from "../services/TesterServices/TesterService";
import { CircularChart } from "./ChartsComponent";
import TextArea from "antd/es/input/TextArea";

export const EmailModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await ProfileServices.updateMail(values);
      onCancel();
      toast.success(response.message);
    } catch (error) {
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
};

export const InfoModal = ({ visible, onCancel, info }) => {
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
};

export const PasswordModal = ({ visible, onCancel }) => {
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
};

export const AddUserModal = ({ visible, onCancel }) => {
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
};

export const AddTestModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("");

  const handleMethodChange = (value) => {
    setMethod(value);
  };

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
          <Select
            defaultValue={""}
            placeholder="http / https / .."
            style={{ width: "100%" }}
            name="protocol"
            options={[
              { value: "http", label: "HTTP" },
              { value: "https", label: "HTTPS" },
            ]}
          />
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
          <Select
            defaultValue={""}
            placeholder="POST GET ..."
            style={{ width: "100%" }}
            name="method"
            onChange={handleMethodChange}
            options={[
              { value: "get", label: "GET" },
              { value: "post", label: "POST" },
            ]}
          />
        </Form.Item>
        {method === "POST" && (
          <Form.Item
            label="Request Body"
            name="requestBody"
            rules={[
              { required: true, message: "Please input the request body !!" },
            ]}
          >
            <Input.TextArea
              placeholder="Request body in JSON format"
              name="requestBody"
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            {loading ? <Spin /> : "Executer test"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const TestStatusModel = ({ visible, onCancel, id, name }) => {
  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={1000}>
      <CircularChart isAdmin={true} id={id} name={name} />
      <Button
        htmlType="submit"
        style={{ backgroundColor: "#2596be", color: "white" }}
        onClick={onCancel}
      >
        Fermer
      </Button>
    </Modal>
  );
};
