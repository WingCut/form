import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Table, Card, Divider, Input, Flex, Popconfirm, Button } from "antd";
import { toast } from "sonner";
import { deleteProduct, getProducts } from "../utils/product.js";
import AddEditProduct from "./AddProduct.jsx";

const AllProducts = () => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [queryObj, setQueryObj] = useState({
    search: "",
  });

  const { data } = useQuery({
    queryKey: ["products", queryObj],
    queryFn: () => getProducts(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteProduct(selectedProduct.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Deleted product!");
    },
  });

  const onSearch = (search) => {
    setQueryObj({
      ...queryObj,
      search,
    });
  };

  const onCancel = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "desc",
    },
    {
      key: "color",
      title: "Color",
      dataIndex: "color",
    },
    {
      key: "size",
      title: "Size",
      dataIndex: "size",
    },
    {
      key: "total",
      title: "Total",
      dataIndex: "total",
    },
    {
      key: "category_id",
      title: "Category_id",
      dataIndex: "category_id",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedProduct(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={onConfirm}
          >
            <DeleteOutlined onClick={() => setSelectedProduct(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Flex vertical gap="large">
        <Card>
          <Input.Search onSearch={onSearch} placeholder="Search here..." />
        </Card>
        <Card
          title={<span>Products</span>}
          extra={
            <Button type="primary" onClick={() => setIsFormOpen(true)}>
              Add Product
            </Button>
          }
        >
          <Table columns={columns} dataSource={data?.data} />
        </Card>
        <AddEditProduct
          open={isFormOpen}
          product={selectedProduct}
          onCancel={onCancel}
        />
      </Flex>
    </div>
  );
};
export default AllProducts;
