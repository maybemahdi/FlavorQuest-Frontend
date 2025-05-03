"use client";
import React from "react";
import { Table, Avatar } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllCommentsQuery } from "@/redux/features/admin/admin.api";

type TComment = {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string;
  };
};

const Comments = () => {
  const { data: commentsData, isFetching } = useGetAllCommentsQuery({});
  const columns: TableColumnsType<TComment> = [
    {
      title: "Profile",
      dataIndex: "user",
      render: (user) => (
        <Avatar
          src={user?.profilePhoto || "https://i.postimg.cc/nLRNMYzn/02.jpg"}
          alt={user?.name}
          size={40}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
    },
    {
      title: "Comment",
      dataIndex: "text",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  return (
    <div className="px-5 mt-6">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={commentsData?.data || []}
          rowKey="id"
          loading={isFetching}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </div>
    </div>
  );
};

export default Comments;
