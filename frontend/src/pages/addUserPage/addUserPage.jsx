import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import AddUserForm from "../../components/addUserForm";
import LayoutComponent from "../../components/LayoutComponent";

function AddUserPage({ role }) {
  return (
    <LayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"3"}
      mainContent={<AddUserForm />}
    ></LayoutComponent>
  );
}

export default AddUserPage;
