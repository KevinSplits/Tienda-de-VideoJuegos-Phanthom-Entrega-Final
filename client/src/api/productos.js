import axios from "./axios";

// Función para obtener todos los productos
export const getProductosRequest = async () => axios.get("/productos");

// Función para crear un nuevo producto
export const createProductoRequest = async (producto) => axios.post("/productos", producto);

// Función para actualizar un producto existente
export const updateProductoRequest = async (id,producto) =>
  axios.put(`/productos/${id}`, producto);

// Función para eliminar un producto
export const deleteProductoRequest = async (id) => axios.delete(`/productos/${id}`);

// Función para obtener un producto por ID
export const getProductoRequest = async (id) => axios.get(`/productos/${id}`);
