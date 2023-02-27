import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import TesterService from "../services/TesterService";
const columns = [
  {
    title: "Nom du test",
    dataIndex: "testName",
    key: "testName",
  },
  {
    title: "Propriétaire",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (_, { createdBy }) => {
      return (
        <div>
          {createdBy.firstname} {createdBy.lastname}
        </div>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "volcano";
      if (status === "Passed") {
        color = "green";
      }
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Date d'execution",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const TableComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    TesterService.fetchAllTests().then((res) => setData(res));
  }, [data]);
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 7,
      }}
    />
  );
};
export default TableComponent;
