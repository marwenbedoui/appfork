import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import TalanLogo from "../../assets/talan-logo.png";
import { useParams } from "react-router-dom";
import { CsvToHtmlTable } from "react-csv-to-table";
import { Button } from "antd";

const Page = () => {
  const { id } = useParams();
  const route = `http://localhost:5000/reports_${id}.csv`;
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const fetchCsv = async () => {
      const response = await fetch(route);
      const csvText = await response.text();
      setCsvData(csvText);
    };
    fetchCsv();
  }, [route]);

  if (!csvData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CsvToHtmlTable
        data={csvData}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      />
      <Button
        href="/testeur/historiques"
        style={{ float: "left", marginTop: "50px" }}
      >
        Retour
      </Button>
    </div>
  );
};

export default function ResultTestPage({ role }) {
  return (
    <>
      <LayoutComponent
        role={role}
        headerLogo={TalanLogo}
        currentPage={"2"}
        mainContent={<Page />}
      ></LayoutComponent>
    </>
  );
}
