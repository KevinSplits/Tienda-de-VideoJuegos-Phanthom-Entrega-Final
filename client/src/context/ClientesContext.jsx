import { createContext, useContext, useState } from "react";
import {
  createClienteRequest,
  deleteClienteRequest,
  getClientesRequest,
  getClienteRequest,
  updateClienteRequest,
} from "../api/clientes";

const ClienteContext = createContext();

export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useCliente debe ser usado dentro de ClienteProvider");
  return context;
};

export function ClienteProvider({ children }) {
  const [clientes, setClientes] = useState([]); 

  const getClientes = async () => {
    const res = await getClientesRequest();
    setClientes(res.data);
  };

  // Función para eliminar un cliente
  const deleteCliente = async (id) => {
    try {
      const res = await deleteClienteRequest(id);
      if (res.status === 204) setClientes(clientes.filter((cliente) => cliente._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Función para crear un nuevo cliente
  const createCliente = async (cliente) => {
    try {
      const res = await createClienteRequest(cliente);
      console.log(res.data);  // Esto te permitirá ver la respuesta exitosa
    } catch (error) {
      console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
    }
  };
  

  // Función para obtener un cliente por ID
  const getCliente = async (id) => {
    try {
      const res = await getClienteRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar un cliente
  const updateCliente = async (id, cliente) => {
    try {
      await updateClienteRequest(id, cliente);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        getClientes,
        deleteCliente,
        createCliente,
        getCliente,
        updateCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}
