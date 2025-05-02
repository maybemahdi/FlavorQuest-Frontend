"use client";
import React, { useState } from "react";
import { Table, Tag, Pagination} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Image from "next/image";
import "./pagination.css";
import MyButton from "@/components/ui/MyButton/MyButton";

enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

type TUser = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  role: string;
  status: UserStatus;
};

const initialUsers: TUser[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    profilePhoto:
      "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1746014285/clk5h9uls1r-1746014346492-file-Test-IMAGE.png",
    contactNumber: "+1234567890",
    role: "USER",
    status: UserStatus.ACTIVE,
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    profilePhoto:
      "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1746014330/abcdefghi1234-image.png",
    contactNumber: "+9876543210",
    role: "ADMIN",
    status: UserStatus.BLOCKED,
  },
];

const ManageUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<TUser[]>(initialUsers);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const paginatedUsers = users.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "green";
      case UserStatus.BLOCKED:
        return "orange";
      case UserStatus.DELETED:
        return "red";
      default:
        return "default";
    }
  };

  const handleStatusChange = (id: string, newStatus: UserStatus) => {
     console.log(id,newStatus)
  };

 

const columns: TableColumnsType<TUser> = [
  {
    title: "User",
    dataIndex: "name",
    render: (_, user) => (
      <div className="flex items-center gap-2">
        <Image
          src={user.profilePhoto}
          alt="User"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-gray-500 text-sm">{user.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: UserStatus) => (
      <Tag color={getStatusColor(status)}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, user) => (
      <div className="flex gap-2 flex-wrap">
        {user.status !== UserStatus.BLOCKED && (
          <MyButton
            label="Block"
            variant="outline"
            onClick={() => handleStatusChange(user.id, UserStatus.BLOCKED)}
          />
        )}
        {user.status !== UserStatus.DELETED && (
          <MyButton
            label="Delete"
            variant="filled"
            customBg="#ff4d4f"
            onClick={() => handleStatusChange(user.id, UserStatus.DELETED)}
          />
        )}
        {user.status !== UserStatus.ACTIVE && (
          <MyButton
            label="Activate"
            variant="filled"
            onClick={() => handleStatusChange(user.id, UserStatus.ACTIVE)}
          />
        )}
      </div>
    ),
  }
  
];


  const onChange: TableProps<TUser>["onChange"] = (
    paginationConfig,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "paginate") {
      setPagination({
        current: paginationConfig.current!,
        pageSize: paginationConfig.pageSize!,
      });
    }
  };

  return (
    <div className="px-5 mt-6">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paginatedUsers}
          pagination={false}
          rowKey="id"
          onChange={onChange}
          scroll={{ x: 800 }}
        />
      </div>

      <div className="pagination-container mt-4 mb-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={users.length}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["1", "2", "5", "10"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default ManageUser;
