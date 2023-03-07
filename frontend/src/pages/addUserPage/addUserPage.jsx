import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import AddUserForm from "../../components/addUserForm";
import AdminLayoutComponent from "../../components/AdminLayoutComponent";

function AddUserPage({ role }) {
  return (
    <AdminLayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"3"}
      mainContent={<AddUserForm />}
    ></AdminLayoutComponent>
  );
}

export default AddUserPage;
