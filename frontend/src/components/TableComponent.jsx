import { Space, Table, Tag } from "antd";
import { useState } from "react";
const columns = [
  {
    title: "Nom du test",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Propriétaire",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Date d'execution",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <div>Invite {record.name}</div>
        <div>Delete</div>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "3",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "4",
    name: "Jim Green",
    age: 42,
    tags: ["loser"],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    tags: ["cool", "teacher"],
  },
  {
    key: "6",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "8",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "9",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
  },
  {
    key: "11",
    name: "John Brown",
    age: 32,
    tags: ["nice", "developer"],
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
