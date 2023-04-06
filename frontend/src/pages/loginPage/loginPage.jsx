import React from "react";
import { FormLogin } from "../../components/formLogin";
import talanLogo from "../../assets/talan-logo.png";
import "./loginPage.css";

export const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img className="login-logo" src={talanLogo} alt="Talan logo" />
      </div>
      <h1 className="login-title">Connexion</h1>
      <FormLogin />
    </div>
  );
};
