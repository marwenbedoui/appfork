import React from "react";
// import AdminLayoutComponent from "../../components/AdminLayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import ProfileComponent from "../../components/ProfileComponent";
import LayoutComponent from "../../components/LayoutComponent";

export default function ProfilePage({ role }) {
  return (
    <LayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={role === "admin" ? "4" : "3"}
      mainContent={<ProfileComponent />}
    ></LayoutComponent>
  );
}
