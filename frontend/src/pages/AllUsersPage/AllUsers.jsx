import { Button } from "antd";
import React, { useEffect, useState } from "react";
import TalanLogo from "../../assets/talan-logo.png";
import { AddUserModal } from "../../components/Modals";
import LayoutComponent from "../../components/LayoutComponent";
import TableComponent from "../../components/TableComponent";
import AdminServices from "../../services/AdminServices/AdminServices";
import { UserAddOutlined } from "@ant-design/icons";
import "../historiquePage/historiquePage.css"

const Page = () => {
  const [data, setData] = useState([]);
  const [modalAddUserForm, setModalAddUserForm] = useState(false);

  const handleCancelAddUser = () => {
    setModalAddUserForm(false);
  };

  useEffect(() => {
    AdminServices.getAllUsers().then((res) => setData(res));
  }, [data]);
  return (
    <div>
      <Button
        className="button"
        size="large"
        type="primary"
        onClick={() => setModalAddUserForm(true)}
        style={{
          float: "right",
          marginBottom: "15px",
          backgroundColor: "#00727A",
          color: "white",
        }}
        shape="round"
        icon={<UserAddOutlined spin={true} />}
      >
        Ajouter utilisateur
      </Button>

      <AddUserModal onCancel={handleCancelAddUser} visible={modalAddUserForm} />
      <TableComponent data={data} isAdminPage={true} />
    </div>
  );
};

export default function AllUsers({ role }) {
  return (
    <LayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"3"}
      mainContent={<Page />}
    ></LayoutComponent>
  );
}
