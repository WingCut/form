import instance from "./axios";

export const getCategories = async (params) => {
  const response = await instance.get("/categories", { params });
  return response;
};

export const createCategory = async (data) => {
  const response = await instance.post("/categories", data);
  return response;
};

export const updateCategory = async (data, id) => {
  const response = await instance.patch(`/categories/${id}`, data);
  return response;
};

export const deleteCategory = async (id) => {
  const response = await instance.delete(`/categories/${id}`);
  return response;
};
