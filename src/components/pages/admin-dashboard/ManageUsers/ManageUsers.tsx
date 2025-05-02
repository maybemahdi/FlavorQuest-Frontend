"use client";
import {
  Table,
  Tag,
  Pagination,
  Tooltip,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllUserQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";
import {
  StopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Image from "next/image";

type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profilePhoto: string;
  contactNumber: string;
};

const ManageUsers = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data: userData, isFetching } = useGetAllUserQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  console.log(userData)

  const users = userData?.data || [];

  const columns: TableColumnsType<TUser> = [
    {
      title: "Photo",
      dataIndex: "profilePhoto",
      render: (img: string) => (
        <Image
          src={img || "https://i.postimg.cc/nLRNMYzn/02.jpg"}
          alt="User"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => {
        const isDisabled = record.status !== "ACTIVE";

        return (
          <div className="flex gap-4">
            <Tooltip title="Block User">
              <StopOutlined
                className={`text-xl ${
                  isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-orange-500 hover:text-orange-600 cursor-pointer"
                }`}
                onClick={() => {
                  if (!isDisabled) {
                    console.log("Block user:", record.id);
                  }
                }}
              />
            </Tooltip>
            <Tooltip title="Delete User">
              <DeleteOutlined
                className={`text-xl ${
                  isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:text-red-600 cursor-pointer"
                }`}
                onClick={() => {
                  if (!isDisabled) {
                    console.log("Delete user:", record.id);
                  }
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TUser>["onChange"] = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current!,
      pageSize: paginationConfig.pageSize!,
    });
  };

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={users}
        loading={isFetching}
        pagination={false}
        rowKey="id"
        scroll={{ x: 900 }}
        onChange={onChange}
      />
      <div className="mt-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={userData?.meta?.total || 0}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["5", "10", "20"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default ManageUsers;
