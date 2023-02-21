import React from "react";
import { Formik } from "formik";
import { Input } from "antd";
import { Login } from "../services/TesterServices";

export const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        setTimeout(() => {
          Login(values.email, values.password);
        }, 1000);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Input
            type="email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name="email"
          />
          <Input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            name="password"
          />
          <button type="submit">Envoyer</button>
        </form>
      )}
    </Formik>
  </div>
);
