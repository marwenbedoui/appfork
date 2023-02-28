import React, { useEffect, useState } from "react";
import LayoutComponent from "../../../components/LayoutComponent";
import TableComponent from "../../../components/TableComponent";
import TalanLogo from "../../../assets/talan-logo.png";
import { Button, Col, Input, Row, Select } from "antd";
import "./historiquePage.css";
import { FormTest } from "../../../components/formTest";
import TesterService from "../../../services/TesterServices/TesterService";

const Page = () => {
  const [modalTest, setModalTest] = useState(false);
  const [statut, setStatut] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    TesterService.fetchAllTests(name, owner, statut).then((res) =>
      setData(res)
    );
  }, [data, name, statut, owner]);

  return (
    <>
      <Button
        type="primary"
        className="bouton"
        onClick={() => setModalTest(true)}
      >
        Exécuter un test
      </Button>
      <Row>
        <Col span={5}>
          <Input
            placeholder="Nom du test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col span={5} offset={1}>
          <Input
            placeholder="Nom du propriétaire"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </Col>
        <Col span={4} offset={1}>
          <Select
            defaultValue={statut}
            style={{ width: "100%" }}
            placeholder="Statut"
            onChange={(e) => setStatut(e)}
            options={[
              { value: "", label: "Tous" },
              { value: "Passed", label: "Passed" },
              { value: "Failed", label: "Failed" },
            ]}
          />
        </Col>
      </Row>
      <FormTest
        visible={modalTest}
        onCancel={() => {
          setModalTest(false);
        }}
      />
      <TableComponent data={data} />
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
