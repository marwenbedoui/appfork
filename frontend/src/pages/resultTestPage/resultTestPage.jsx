import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { useParams } from "react-router-dom";
import { Button, Col, Empty, Row, Spin } from "antd";
import TesterService from "../../services/TesterServices/TesterService";
import { TestChart } from "../../components/ChartsComponent";
import { RollbackOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Page = ({ role }) => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const executeTest = async (data) => {
    setLoading(true);
    await TesterService.executerTest(data)
      .then(() => {
        toast.success("Test effectué avec succès");
        window.location.href = `/${role}/historiques`;
      })
      .catch(() => {
        toast.danger("Test echoué");
      });
    setLoading(false);
  };

  useEffect(() => {
    TesterService.getTestById(id)
      .then((response) => {
        setData(response);
        setDetail(response.detail);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!detail || detail.length === 0) {
    return <Empty tip="Loading" size="large" />;
  }
  const path = `/${role}/historiques`;
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button
          size="large"
          type="primary"
          style={{ float: "right", backgroundColor: "green", color: "white" }}
          shape="round"
          htmlType="submit"
          onClick={() => executeTest(data)}
        >
          {loading ? <Spin /> : "Executer le test"}
        </Button>
        <Button
          size="large"
          type="primary"
          href={path}
          style={{ float: "right" }}
          shape="round"
          icon={<RollbackOutlined />}
        >
          Retour
        </Button>
      </Col>
      <Col span={24}>
        <TestChart values={detail} />
      </Col>
    </Row>
  );
};

export default function ResultTestPage({ role }) {
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
