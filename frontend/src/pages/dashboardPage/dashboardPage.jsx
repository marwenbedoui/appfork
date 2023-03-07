import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import LineCharts from "../../components/lineCharts";
import { Col, Row } from "antd";
// import AdminLayoutComponent from "../../components/AdminLayoutComponent";
import LayoutComponent from "../../components/LayoutComponent";

export default function DashbaordPage({ role }) {
  const Page = () => {
    return (
      <Row>
        <Col span={11} offset={1}>
          <LineCharts
            attribute={"cpuUsage"}
            name={"CPU"}
            color={"rgb(75, 192, 192)"}
          />
        </Col>
        <Col span={11} offset={1}>
          <LineCharts
            attribute={"diskIoTime"}
            name={"Disque"}
            color={"rgb(75, 192, 192)"}
          />
        </Col>
        <Col span={11} offset={1}>
          <LineCharts
            attribute={"networkSpeed"}
            name={"Réseau"}
            color={"rgb(0, 21, 41)"}
          />
        </Col>
        <Col span={11} offset={1}>
          <LineCharts
            attribute={"memoryUsage"}
            name={"Mémoire"}
            color={"#001529"}
          />
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
