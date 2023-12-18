import instance from "./axios";

export const getProducts = async (params) => {
  const response = await instance.get("/products", { params });
  return response;
};

export const createProduct = async (data) => {
  const response = await instance.post("/products", data);
  return response;
};

export const updateProduct = async (data, id) => {
  const response = await instance.patch(`/products/${id}`, data);
  return response;
};

export const deleteProduct = async (id) => {
  const response = await instance.delete(`/products/${id}`);
  return response;
};
