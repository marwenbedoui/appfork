import React from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";

export default function ProfilePage() {
  return (
    <LayoutComponent
      headerLogo={TalanLogo}
      currentPage={"3"}
      mainContent={<ProfileComponent />}
    ></LayoutComponent>
  );
}
