import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { useParams } from "react-router-dom";
import { Button, Col, Empty, Row, Spin, Space } from "antd";
import TesterService from "../../services/TesterServices/TesterService";
import { TestChart } from "../../components/ChartsComponent";
import {
  //RollbackOutlined,
  PercentageOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { TestPercentageModal } from "../../components/Modals";

const Page = ({ role }) => {
  const [modalPercentageVisible, setModalPercentageVisible] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleCancelPercentage = () => {
    setModalPercentageVisible(false);
  };

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
  //const path = `/${role}/historiques`;
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {/* <Space style={{ float: "left" }}>
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
        </Space> */}
        <Space style={{ float: "right" }}>
          <Button
            size="large"
            type="primary"
            style={{
              float: "right",
              backgroundColor: "#121212",
              color: "white",
            }}
            icon={<PercentageOutlined />}
            shape="round"
            onClick={() => setModalPercentageVisible(true)}
          >
            Voir le pourcentage
          </Button>
          <Button
            size="large"
            type="primary"
            style={{ float: "right", backgroundColor: "green", color: "white" }}
            shape="round"
            htmlType="submit"
            onClick={() => executeTest(data)}
            icon={<RedoOutlined />}
          >
            {loading ? <Spin /> : "Executer le test"}
          </Button>

          <TestPercentageModal
            onCancel={handleCancelPercentage}
            visible={modalPercentageVisible}
            percentage={data.pourcentage}
          />
        </Space>
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
