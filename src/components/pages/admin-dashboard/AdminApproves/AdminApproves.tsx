"use client";
import React, { useState } from "react";
import {
  Table,
  Tag,
  TableColumnsType,
  Pagination,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import "./pagination.css";
import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
// import { toast } from "sonner";
import {
  useGetAllPostsQuery,
} from "@/redux/features/admin/admin.api";

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

const AdminApproves = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

  const { data: postsData, isFetching} = useGetAllPostsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
    searchTerm,
    role,
    status:"APPROVED"
  });

  

  const handleApprove = async (post: TPost) => {
     console.log(post)
  };

  const columns: TableColumnsType<TPost> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <Image
            src={img}
            alt="Post"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Image
            src="https://i.postimg.cc/nLRNMYzn/02.jpg"
            alt="Default Image"
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt="User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Image
              src="https://i.postimg.cc/nLRNMYzn/02.jpg"
              alt="Default User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          )}
          {user.name}
        </div>
      ),
    },
    {
      title: "Action",
      render: (_: unknown, record: TPost) => {
        const canApprove =
          record.status === "APPROVED" && !record.isPremium;

        return (
          <Popconfirm
            title="Are you sure to approve this post?"
            onConfirm={() => handleApprove(record)}
            okText="Yes"
            cancelText="No"
            disabled={!canApprove}
          >
            <CheckCircleOutlined
              className={`text-xl ${
                canApprove
                  ? "text-green-600 hover:text-green-800 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            />
          </Popconfirm>
        );
      },
    },
  ];

  const onChange: TableProps<TPost>["onChange"] = (
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
      <MyFormWrapper className="mb-10" onSubmit={() => {}}>
        <div className="flex gap-5 flex-wrap">
          <MyFormInput
            name="searchTerm"
            placeHolder="Search by title"
            onValueChange={(val) => setSearchTerm(val)}
          />
          <MyFormSelect
            name="role"
            placeHolder="Filter by role"
            options={[
              { label: "ADMIN", value: "ADMIN" },
              { label: "USER", value: "USER" },
              { label: "PREMIUM_USER", value: "PREMIUM_USER" },
            ]}
            isSearch
            onValueChange={(val) => setRole(val)}
            className="min-w-[220px]"
          />
        </div>
      </MyFormWrapper>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={postsData?.data || []}
          pagination={false}
          rowKey="id"
          onChange={onChange}
          loading={isFetching}
          scroll={{ x: 900 }}
        />
      </div>

      <div className="pagination-container mt-4 mb-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={postsData?.meta?.total || 0}
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

export default AdminApproves;
