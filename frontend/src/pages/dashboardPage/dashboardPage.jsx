import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import { Col, Row } from "antd";
// import AdminLayoutComponent from "../../components/AdminLayoutComponent";
import LayoutComponent from "../../components/LayoutComponent";
import CircularChart from "../../components/circularChart";
import LineCharts from "../../components/lineCharts";

export default function DashbaordPage({ role }) {
  const Page = () => {
    return (
      <Row>
        <Col span={12}>
          <CircularChart />
        </Col>
        <Col span={12}>
          <LineCharts />
        </Col>
      </Row>
    );
  };
  return (
    <LayoutComponent
      role={role}
      headerLogo={TalanLogo}
      currentPage={"1"}
      mainContent={<Page />}
    ></LayoutComponent>
  );
}
