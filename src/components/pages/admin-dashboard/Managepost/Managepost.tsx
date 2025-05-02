"use client";
import React, { useState } from "react";
import { Table, Tag, TableColumnsType, Pagination } from "antd";
import type { TableProps } from "antd";
import "./pagination.css";
import Image from "next/image";
import MyButton from "@/components/ui/MyButton/MyButton";

type TPost = {
  id: string;
  title: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  status: string;
  isPremium: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber: string;
    role: string;
    status: string;
  };
};

const mockData: TPost[] = [
  {
    id: "1",
    title: "Chips & Salsa",
    location: "Dhaka, Bangladesh",
    minPrice: 50,
    maxPrice: 80,
    image:
      "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1745994335/o7wrbcda4xj-1745994394331-file-Test-IMAGE.png",
    status: "APPROVED",
    isPremium: true,
    user: {
      id: "u1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      profilePhoto:
        "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1746014285/clk5h9uls1r-1746014346492-file-Test-IMAGE.png",
      contactNumber: "+1234567890",
      role: "USER",
      status: "ACTIVE",
    },
  },
  {
    id: "2",
    title: "Mango Smoothie",
    location: "Sylhet, Bangladesh",
    minPrice: 100,
    maxPrice: 150,
    image:
      "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1745994436/n1qiemnpz2e-1745994495641-file-Test-IMAGE.png",
    status: "PENDING",
    isPremium: false,
    user: {
      id: "u2",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      profilePhoto:
        "https://res.cloudinary.com/dxm5tpw0l/image/upload/v1746014330/abcdefghi1234-image.png",
      contactNumber: "+9876543210",
      role: "USER",
      status: "ACTIVE",
    },
  },
];

const Mannagepost = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const paginatedData = mockData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  const columns: TableColumnsType<TPost> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <Image
          src={img}
          alt="Post"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "APPROVED" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Premium",
      dataIndex: "isPremium",
      render: (isPremium) =>
        isPremium ? <Tag color="gold">Premium</Tag> : <Tag>No</Tag>,
    },
    {
      title: "Posted By",
      dataIndex: "user",
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={user.profilePhoto}
            alt="User"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          {user.name}
        </div>
      ),
    },
    {
      title: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: TPost) => (
        <div className="flex gap-2">
          <MyButton
            label="Approve"
            variant="filled"
            isDisabled={record.status === "APPROVED"}
            onClick={() => console.log("Approved:", record.id)}
            className="text-sm px-4 py-2"
          />
          <MyButton
            label="Reject"
            variant="outline"
            onClick={() => console.log("Rejected:", record.id)}
            className="text-sm px-4 py-2 text-red-500 border-red-500 hover:bg-red-100"
          />
        </div>
      ),
    }
  ];

  const onChange: TableProps<TPost>["onChange"] = (paginationConfig, _filters, _sorter, extra) => {
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
          dataSource={paginatedData}
          pagination={false}
          rowKey="id"
          onChange={onChange}
          scroll={{ x: 900 }}
        />
      </div>

      <div className="pagination-container mt-4 mb-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={mockData.length}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["1","2", "5", "10"]}
          onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
        />
      </div>
    </div>
  );
};

export default Mannagepost;
