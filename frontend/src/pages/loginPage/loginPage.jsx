import React from "react";
import { FormLogin } from "../../components/formLogin";
import "./loginPage.css";

export const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Connexion</h1>
      </div>
      <FormLogin />
    </div>
  );
};
