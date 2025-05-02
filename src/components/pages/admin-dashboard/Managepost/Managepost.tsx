"use client"
import React, { useState } from "react";
import {
  Table,
  Tag,
  TableColumnsType,
  Pagination,
  Modal,
} from "antd";
import type { TableProps } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";

import "./pagination.css";
import Image from "next/image";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyButton from "@/components/ui/MyButton/MyButton";
import { toast } from "sonner";
import { z } from "zod";
import { useGetAllPostsQuery } from "@/redux/features/admin/admin.api";

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

const postSchema = z.object({
  adminComment: z.string().min(1, { message: "Admin comment is required" }),
});

const ManagePost = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);

 
  const { data: postsData, isFetching } = useGetAllPostsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  console.log(postsData)

  const handleOpenModal = (status: "APPROVED" | "REJECTED", post: TPost) => {
    setActionStatus(status);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: { adminComment: string }, reset: () => void) => {
    if (selectedPost) {
      const result = {
        id: selectedPost.id,
        status: actionStatus,
        adminComment: data.adminComment,
      };

      console.log(result);

      toast.success("Post updated successfully!");
      setIsModalOpen(false);
      reset();
    }
  };

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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
        <div className="flex gap-4">
          <CheckCircleOutlined
            onClick={() => handleOpenModal("APPROVED", record)}
            className={`text-xl cursor-pointer ${record.status === "APPROVED" ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:text-green-800"}`}
            style={{
              pointerEvents: record.status === "APPROVED" ? "none" : "auto",
            }}
          />
          <CloseCircleOutlined
            onClick={() => handleOpenModal("REJECTED", record)}
            className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
          />
        </div>
      ),
    },
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
          onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
        />
      </div>

      <Modal
        title={`${actionStatus} Post`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <MyFormWrapper
          resolver={zodResolver(postSchema)}
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <MyFormInput
            name="adminComment"
            placeHolder="Enter admin comment"
            type="text"
          />
          <MyButton type="submit" label="Submit" fullWidth />
        </MyFormWrapper>
      </Modal>
    </div>
  );
};

export default ManagePost;
