import React from "react";
import LayoutComponent from "../../../components/LayoutComponent";
import TalanLogo from "../../../assets/talan-logo.png";

export default function DashbaordPage() {
  return (
    <LayoutComponent
      headerLogo={TalanLogo}
      currentPage={"1"}
      mainContent={<div>Dashboard</div>}
    ></LayoutComponent>
  );
}
