import axiosInstance from "./axiosInstance";

export const fetchProducts = (page = 1, limit = 12) =>
  axiosInstance.get("/randomproducts", {
    params: { page, limit },
  });

export const fetchProductById = (id) =>
  axiosInstance.get(`/randomproducts/${id}`);
