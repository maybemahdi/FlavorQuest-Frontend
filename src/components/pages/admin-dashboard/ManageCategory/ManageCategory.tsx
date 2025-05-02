


"use client";
import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

type TCategory = {
  id: string;
  name: string;
};

const categoryData: TCategory[] = [
  {
    id: "c2865189-b55d-480d-868a-ba4ed6547488",
    name: "Snacks",
  },
  {
    id: "c5446ab6-bf13-4336-b117-0370b5cb1e56",
    name: "Meals",
  },
  {
    id: "19b74169-17c7-489d-855e-138dea2f3199",
    name: "Drinks",
  },
];

const ManageCategories = () => {
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
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={categoryData}
          rowKey="id"
          pagination={false}
          scroll={{ x: 500 }}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
