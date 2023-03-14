import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Spin } from "antd";
import TesterService from "../../services/TesterServices/TesterService";
import {TestChart } from "../../components/ChartsComponent";
import { RollbackOutlined } from "@ant-design/icons";

const Page = ({ role }) => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    TesterService.getTestById(id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!data || data.length === 0) {
    return <Spin tip="Loading" size="large" />;
  }
  const path = `/${role}/historiques`;
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
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
        <TestChart values={data} />
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
