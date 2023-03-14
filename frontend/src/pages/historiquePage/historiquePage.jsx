import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { Button, Col, Input, Row, Select, Tooltip } from "antd";
import "./historiquePage.css";
import { AddTestModal } from "../../components/Modals";
import TesterService from "../../services/TesterServices/TesterService";
import LayoutComponent from "../../components/LayoutComponent";
import { FileAddOutlined } from "@ant-design/icons";

const Page = ({ role }) => {
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
      {role === "simpleUser" ? (
        ""
      ) : (
        // TODO : Tooltip must be fixed
        <Tooltip title="Add new user">
          <Button
            size="large"
            type="primary"
            onClick={() => setModalTest(true)}
            style={{
              float: "right",
              marginBottom: "30px",
              backgroundColor: "#2596be",
              color: "white",
            }}
            shape="round"
            icon={<FileAddOutlined spin={true} />}
          >
            Executer test
          </Button>
        </Tooltip>
      )}
      <Row>
        <Col span={5}>
          <Input
            placeholder="Nom du test"
            value={name}
            //TODO : fix the index
            //key={data.indexOf(name)}
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
      <AddTestModal
        visible={modalTest}
        onCancel={() => {
          setModalTest(false);
        }}
      />
      <TableComponent data={data} isAdminPage={false} role={role} />
    </>
  );
};

export default function HistoriquePage({ role }) {
  return (
    <>
      <LayoutComponent
        role={role}
        headerLogo={TalanLogo}
        currentPage={"2"}
        mainContent={<Page role={role} />}
      ></LayoutComponent>
    </>
  );
}
