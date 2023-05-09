import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, Button, Form, Input } from "antd";
import AuthService from "../services/AuthServices/AuthServices";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../pages/loginPage/loginPage.css";

export const FormLogin = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        setTimeout(() => {
          AuthService.login(values.email, values.password).then(
            () => {
              setError(false);
              setSuccess(true);
              setMsg("Authentification effectuée avec succès");
              window.location.reload("/");
            },
            (e) => {
              const resMessage = "Email ou mot de passe erronés";
                // (e.response && e.response.data && e.response.data.msg) ||
                // e.message ||
                // e.toString();
              setError(true);
              setMsg(resMessage);
            }
          );
        }, 300);
      }}
    >
      {(props) => (
        <>
          <Form
            onSubmit={props.handleSubmit}
            className="login-form"
            name="basic"
            initialValues={{
              remember: true,
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            {error ? (
              <Alert
                className="alert"
                style={{
                  maxWidth: 450,
                  marginBottom: "5%",
                }}
                message={msg}
                type="error"
                showIcon
              />
            ) : (
              ""
            )}
            {success ? (
              <Alert
                className="alert"
                style={{
                  maxWidth: 450,
                  marginBottom: "5%",
                }}
                message={msg}
                type="success"
                showIcon
              />
            ) : (
              ""
            )}
            <Form.Item
              label="Email"
              name="username"
              className="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                className="login-form-input"
                name="email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                className="login-form-input"
                name="password"
              />
            </Form.Item>
            <Form.Item
              className="login-form-button"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={props.handleSubmit}
              >
                Envoyer
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Formik>
  );
};
