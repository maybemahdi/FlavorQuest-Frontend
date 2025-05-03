


"use client";
import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllCategoryQuery } from "@/redux/features/admin/admin.api";

type TCategory = {
  id: string;
  name: string;
};


const ManageCategories = () => {
  const { data: postsData, isFetching } = useGetAllCategoryQuery({});

 console.log(postsData)

  const columns: TableColumnsType<TCategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div className="px-5 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All category</h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={postsData?.data}
          rowKey="id"
          pagination={false}
          scroll={{ x: 500 }}
          loading={isFetching}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
