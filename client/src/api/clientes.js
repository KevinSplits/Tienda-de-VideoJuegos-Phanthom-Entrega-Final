import axios from "./axios";

// Función para obtener todos los clientes
export const getClientesRequest = async () => axios.get("/clientes");

// Función para crear un nuevo cliente
export const createClienteRequest = async (cliente) => axios.post("/clientes", cliente);

// Función para actualizar un cliente existente
export const updateClienteRequest = async (id,cliente) =>
  axios.put(`/clientes/${id}`, cliente);

// Función para eliminar un cliente
export const deleteClienteRequest = async (id) => axios.delete(`/clientes/${id}`);

// Función para obtener un cliente por ID
export const getClienteRequest = async (id) => axios.get(`/clientes/${id}`);
