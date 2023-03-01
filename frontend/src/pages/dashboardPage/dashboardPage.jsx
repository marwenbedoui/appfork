import React from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";

export default function DashbaordPage({ role }) {
  return (
    <LayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"1"}
      mainContent={<div>Dashboard</div>}
    ></LayoutComponent>
  );
}
