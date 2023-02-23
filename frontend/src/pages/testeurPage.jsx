import React from "react";
import LayoutComponent from "../components/LayoutComponent";
import TableComponent from "../components/TableComponent";

export default function TesteurPage() {
  return (
    <>
      <LayoutComponent
        headerText={"Welcome Mr Tester"}
        mainContent={<TableComponent />}
      ></LayoutComponent>
    </>
  );
}
