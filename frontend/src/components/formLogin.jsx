import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, Button, Form, Input } from "antd";
import TestAuthService from "../services/TesterAuthServices";

export const FormLogin = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        setTimeout(() => {
          TestAuthService.login(values.email, values.password).then(
            () => {
              setError(false);
              setSuccess(true);
              setMsg("Authentification effectuée avec succès");
              window.location.reload("/");
            },
            (e) => {
              const resMessage =
                (e.response && e.response.data && e.response.data.msg) ||
                e.message ||
                e.toString();

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
            name="basic"
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
              rules={[
                {
                  required: true,
                  message: "Please input your email !",
                },
              ]}
            >
              <Input
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
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
              <Input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
              />
            </Form.Item>
            <Form.Item
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
