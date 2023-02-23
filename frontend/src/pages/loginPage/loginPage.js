import { Card } from "antd";
import React from "react";
import { FormLogin } from "../../components/formLogin";
import "./loginPage.css";

export const LoginPage = () => {
  return (
    <div
      style={{
        marginTop: "120px",
      }}
    >
      <h1 className="titre">Login</h1>
      <div className="card-container">
        <Card className="card">
          <FormLogin />
        </Card>
      </div>
    </div>
  );
};
