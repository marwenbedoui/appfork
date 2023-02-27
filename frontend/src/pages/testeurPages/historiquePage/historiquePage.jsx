import LayoutComponent from "../../../components/LayoutComponent";
import TableComponent from "../../../components/TableComponent";
import TalanLogo from "../../../assets/talan-logo.png";
import { Button } from "antd";
import { useState } from "react";
import { FormTest } from "../../../components/formTest";
import "./historiquePage.css";

const Page = () => {
  const [modalTest, setModalTest] = useState(false);

  return (
    <>
      <Button
        type="primary"
        className="bouton"
        onClick={() => setModalTest(true)}
      >
        Exécuter un test
      </Button>
      <FormTest
        visible={modalTest}
        onCancel={() => {
          setModalTest(false);
        }}
      />
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
