import React from "react";
import { Formik } from "formik";
import { Button, Form, Input } from "antd";
import TesterService from "../services/TesterService";

export const FormTest = () => {
  return (
    <Formik
      initialValues={{ protocol: "", url: "", port: "", path: "", method: "" }}
      onSubmit={(values) => {
        TesterService.executerTest(values).then((data) => console.log(data));
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
            <Form.Item
              label="Protocol"
              name="protocol"
              rules={[
                {
                  required: true,
                  message: "Please input the protocol !!",
                },
              ]}
            >
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.protocol}
                name="protocol"
              />
            </Form.Item>

            <Form.Item
              label="URL"
              name="url"
              rules={[
                {
                  required: true,
                  message: "Please input the url !!",
                },
              ]}
            >
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.url}
                name="url"
              />
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
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.port}
                name="port"
              />
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
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.path}
                name="path"
              />
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
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.method}
                name="method"
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