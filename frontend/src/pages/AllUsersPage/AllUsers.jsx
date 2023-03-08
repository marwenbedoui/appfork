import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import TalanLogo from "../../assets/talan-logo.png";
import AddUserForm from "../../components/addUserForm";
import LayoutComponent from "../../components/LayoutComponent";
import TableComponent from "../../components/TableComponent";
import AdminServices from "../../services/AdminServices/AdminServices";
import { UserAddOutlined } from "@ant-design/icons";

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
    <>
      <Tooltip title="Add new user">
        <Button
          size="large"
          type="primary"
          onClick={() => setModalAddUserForm(true)}
          style={{ float: "right", marginBottom: "30px" }}
          shape="round"
          icon={<UserAddOutlined spin={true} />}
        >
          Add user
        </Button>
      </Tooltip>

      <AddUserForm onCancel={handleCancelAddUser} visible={modalAddUserForm} />
      <TableComponent data={data} isAdminPage={true} />
    </>
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
