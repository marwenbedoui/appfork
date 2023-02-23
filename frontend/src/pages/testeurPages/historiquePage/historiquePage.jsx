import React, { useState } from "react";
import LayoutComponent from "../../../components/LayoutComponent";
import TableComponent from "../../../components/TableComponent";
import TalanLogo from "../../../assets/talan-logo.png";
import { Button, Modal } from "antd";
import "../historiquePage/historiquePage.css";
import { FormLogin } from "../../../components/formLogin";
import { FormTest } from "../../../components/formTest";

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" className="bouton" onClick={() => setOpen(true)}>
        Exécuter un test
      </Button>
      <Modal
        title="Remplir le formulaire pour exécuter un test"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <FormTest />
      </Modal>
      <TableComponent />
    </>
  );
};

export default function HistoriquePage() {
  return (
    <>
      <LayoutComponent
        headerLogo={TalanLogo}
        currentPage={"2"}
        mainContent={<Page />}
      ></LayoutComponent>
    </>
  );
}
