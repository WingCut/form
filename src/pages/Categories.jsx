import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Table, Divider, Card, Button, Popconfirm, Flex, Image } from "antd";
import { toast } from "sonner";

import { deleteCategory, getCategories } from "../utils/category.js";
import AddCategory from "./AddCategory.jsx";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  console.log(data?.data);

  const { mutate } = useMutation({
    mutationFn: () => deleteCategory(selectedCategory.id),
    onSuccess: () => {
      refetch();
      toast.success("Category deleted!");
    },
  });
  const onCancel = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(false);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "category_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedCategory(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete category"
            description="Are you sure to delete this category?"
            onConfirm={mutate}
          >
            <DeleteOutlined onClick={() => setSelectedCategory(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Flex vertical gap="large">
        <Card
          title={<span>Categories</span>}
          extra={
            <Button type="primary" onClick={() => setIsFormOpen(true)}>
              Add Category
            </Button>
          }
        >
          <Table columns={columns} dataSource={data?.data} />
        </Card>
        <AddCategory
          open={isFormOpen}
          category={selectedCategory}
          refetch={refetch}
          onCancel={onCancel}
        />
      </Flex>
    </div>
  );
};
export default Categories;
