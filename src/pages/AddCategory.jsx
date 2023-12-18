import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Upload, Modal, Input, Button } from "antd";
import { toast } from "sonner";
import { createCategory, updateCategory } from "../utils/category.js";

const AddCategory = ({ open, category, refetch, onCancel }) => {
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: category
      ? (values) => updateCategory(values, category.id)
      : createCategory,
    onSuccess: () => {
      refetch();
      onCancel();
      toast.success(category ? "Category updated!" : "Category created!");
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
      title={category ? "Edit category" : "Create category"}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="category-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        preserve={false}
        id="category-form"
        name="category-form"
        labelCol={{ span: 4 }}
        onFinish={mutate}
        initialValues={{ ...category }}
      >
        <Form.Item
          label={<span>Name</span>}
          name="category_name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddCategory;
