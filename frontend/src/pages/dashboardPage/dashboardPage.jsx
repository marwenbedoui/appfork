import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import {  Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import { CircularChart, LineCharts } from "../../components/ChartsComponent";

export default function DashbaordPage({ role }) {
  const Page = () => {
    return (
      <Row>
        <Col span={13}>
          <CircularChart isAdmin={false} name={"circular"} />
        </Col>
        <Col span={11}>
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
