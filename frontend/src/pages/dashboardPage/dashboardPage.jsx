import React from "react";
import TalanLogo from "../../assets/talan-logo.png";
import { Col, Row } from "antd";
// import AdminLayoutComponent from "../../components/AdminLayoutComponent";
import LayoutComponent from "../../components/LayoutComponent";
import LineChart from "../../components/dynamicChart";

export default function DashbaordPage({ role }) {
  const Page = () => {
    return (
      <Row>
        <Col span={24}>
          <LineChart attribute={"cpuUsage"} name={"CPU"} />
        </Col>
        {/* <Col span={12}>
          <LineChart attribute={"diskIoTime"} name={"Disque"} />
        </Col>
        <Col span={12}>
          <LineChart attribute={"networkSpeed"} name={"Réseau"} />
        </Col>
        <Col span={12}>
          <LineChart attribute={"memoryUsage"} name={"Mémoire"} />
        </Col> */}
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
