import React from "react";
import AdminLayoutComponent from "../../components/AdminLayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";

export default function ProfilePage({ role }) {
  return (
    <AdminLayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"4"}
      mainContent={<ProfileComponent />}
    ></AdminLayoutComponent>
  );
}
