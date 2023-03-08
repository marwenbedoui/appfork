import { Button, Popconfirm, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import AdminServices from "../services/AdminServices/AdminServices";

const TableComponent = ({ data, isAdminPage }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!isAdminPage) {
      setColumns([
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
      ]);
    } else {
      setColumns([
        {
          title: "First name",
          dataIndex: "firstname",
          key: "firstname",
        },
        {
          title: "Last name",
          dataIndex: "lastname",
          key: "lastname",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          render: (_, { role }) => {
            let color = "geekblue";
            if (role === "admin") {
              color = "volcano";
            } else if (role === "tester") {
              color = "green";
            }
            return <Tag color={color}>{role.toUpperCase()}</Tag>;
          },
        },
        {
          title: "Action",
          dataIndex: "_id",
          key: "_id",
          render: (_, { _id, role }) => {
            if (role === "admin") {
              return null;
            }
            return (
              <Popconfirm
                title="Delete user"
                description="Are you sure you want to delete this user?"
                onConfirm={() => AdminServices.deleteUserById(_id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            );
          },
        },
      ]);
    }
  }, [isAdminPage]);

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
