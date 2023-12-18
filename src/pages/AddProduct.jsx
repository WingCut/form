import React, { useContext, useEffect, useState, createContext } from "react";

import { Form, Input, Button, Modal, Select } from "antd";
import { toast } from "sonner";
import { createProduct, updateProduct } from "../utils/product.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConfigContext } from "../contexts/config.context";

const AddEditProduct = ({ product, open, onCancel }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { configs } = useContext(ConfigContext);
  console.log(configs);

  const { mutate } = useMutation({
    mutationFn: product
      ? (values) => updateProduct(values, product.id)
      : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onCancel();
      toast.success(product ? "Updated product!" : "Created product!");
    },
    onError: () => {
      toast.error("Somethings went wrong. Please check again!");
    },
  });

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={() => {
        onCancel();
      }}
      title={product ? "Edit Product" : "Create product"}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="product-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="product-form"
        name="product-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={mutate}
        initialValues={{ ...product }}
      >
        <Form.Item
          label={<span>Product</span>}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={<span>desc</span>} name="desc">
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Color</span>}
          name="color"
          rules={[
            {
              required: true,
              message: "Please input product color!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Size</span>}
          name="size"
          rules={[
            {
              required: true,
              message: "Please input product size!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Total</span>}
          name="total"
          rules={[
            {
              required: true,
              message: "Please input product size!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Category</span>}
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please select product category!",
            },
          ]}
        >
          {/* <Select options={configs?.categories} /> */}
          <Select
            options={configs?.map((category) => ({
              value: category.id,
              label: category.category_name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={<span>Price</span>}
          name="price"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddEditProduct;
