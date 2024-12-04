import axios from "./axios";

export const getSuppliersRequest = async () => axios.get("/suppliers");

export const createSupplierRequest = async (supplier) => axios.post("/suppliers", supplier);

export const updateSupplierRequest = async (supplier) =>
  axios.put(`/suppliers/${supplier._id}`, supplier);

export const deleteSupplierRequest = async (id) => axios.delete(`/suppliers/${id}`);

export const getSupplierRequest = async (id) => axios.get(`/suppliers/${id}`);