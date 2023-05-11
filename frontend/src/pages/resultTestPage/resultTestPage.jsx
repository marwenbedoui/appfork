import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { useParams } from "react-router-dom";
import { Button, Col, Empty, Row, Spin, Space } from "antd";
import TesterService from "../../services/TesterServices/TesterService";
import { TestChart } from "../../components/ChartsComponent";
import {
  PercentageOutlined,
  RedoOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { TestDetailModal, TestPercentageModal } from "../../components/Modals";
import "./resultTestPage.css";
import AuthVerifyService from "../../services/AuthServices/AuthVerifyService";
import ProfileServices from "../../services/ProfileServices";

const Page = ({ role }) => {
  const [modalPercentageVisible, setModalPercentageVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [verifyUserTest, setVerifyUserTest] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleCancelPercentage = () => {
    setModalPercentageVisible(false);
  };
  const handleCancelDetail = () => {
    setModalDetailVisible(false);
  };

  const executeTest = async (data) => {
    setLoading(true);
    await TesterService.executerTest(data, true)
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
    ProfileServices.getInfos()
      .then((response) => {
        response._id === data.createdBy
          ? setVerifyUserTest(true)
          : setVerifyUserTest(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, verifyUserTest, data.createdBy]);
  const isAuthVerifyValid = AuthVerifyService.authVerify() === 1;

  if (!detail) {
    return <Empty tip="Loading" size="large" />;
  }
  if (detail.length === 0) {
    return <Spin tip="Loading" size="large" />;
  }
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space style={{ float: "right" }}>
          <Button
            size="large"
            type="primary"
            style={{
              float: "right",
              backgroundColor: "#36454F",
              color: "white",
            }}
            className="button"
            icon={<EyeOutlined />}
            shape="round"
            onClick={() => setModalDetailVisible(true)}
          >
            Détail
          </Button>
          <Button
            size="large"
            type="primary"
            style={{
              float: "right",
              backgroundColor: "#4682B4",
              color: "white",
            }}
            className="button"
            icon={<PercentageOutlined />}
            shape="round"
            onClick={() => setModalPercentageVisible(true)}
          >
            Voir le pourcentage
          </Button>
          <Button
            disabled={isAuthVerifyValid || !verifyUserTest}
            size="large"
            type="primary"
            style={
              !isAuthVerifyValid || verifyUserTest
                ? {
                    float: "right",
                    backgroundColor: "#ffa07a",
                    color: "white",
                  }
                : {
                    float: "right",
                    backgroundColor: "#A2AF9F",
                    color: "white",
                  }
            }
            className={loading ? null : "button"}
            shape="round"
            htmlType="submit"
            onClick={() => executeTest(data)}
            icon={<RedoOutlined />}
            loading={loading}
          >
            {loading ? null : "Executer le test"}
          </Button>

          <TestPercentageModal
            onCancel={handleCancelPercentage}
            visible={modalPercentageVisible}
            percentage={data.pourcentage}
          />
          <TestDetailModal
            onCancel={handleCancelDetail}
            visible={modalDetailVisible}
            detailArray={data}
          />
        </Space>
      </Col>

      <Col span={24}>
        <Row style={{ marginBottom: "40px" }}>
          <Col span={12} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <TestChart values={detail} field="CPU" />
          </Col>
          <Col span={12} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <TestChart values={detail} field="Mémoire" />
          </Col>
          <Col span={12} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <TestChart values={detail} field="Disque" />
          </Col>
          <Col span={12} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <TestChart values={detail} field="Réseau" />
          </Col>
        </Row>
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
