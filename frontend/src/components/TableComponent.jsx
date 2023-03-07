import { Table, Tag } from "antd";

const columns = [
  {
    title: "Nom du test",
    dataIndex: "testName",
    key: "testName",
    render: (_, { _id, testName }) => {
      const route = `/testeur/test/${_id}`;
      return (
        <div style={{ textTransform: "capitalize" }}>
          <a href={route}>{testName}</a>
        </div>
      );
    },
  },
  {
    title: "Propriétaire",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (_, { createdBy }) => {
      return (
        <div style={{ textTransform: "capitalize" }}>
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
    render: (_, { createdAt }) => {
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleString().replace(",", "");
      return <div>{formattedDate}</div>;
    },
  },
];

const TableComponent = ({ data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 7,
      }}
    />
  );
};
export default TableComponent;
