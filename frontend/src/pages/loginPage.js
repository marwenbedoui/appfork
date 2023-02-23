import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, Input } from "antd";
import TestAuthService from "../services/TesterServices";

export const LoginPage = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <h1>Login</h1>
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
            {error ? (
              <Alert className="alert" message={msg} type="error" showIcon />
            ) : (
              ""
            )}
            {success ? (
              <Alert className="alert" message={msg} type="success" showIcon />
            ) : (
              ""
            )}
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
          </>
        )}
      </Formik>
    </div>
  );
};
