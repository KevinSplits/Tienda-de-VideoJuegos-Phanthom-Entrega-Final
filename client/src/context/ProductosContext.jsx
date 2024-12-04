import { createContext, useContext, useState } from "react";
import {
  createProductoRequest,
  deleteProductoRequest,
  getProductosRequest,
  getProductoRequest,
  updateProductoRequest,
} from "../api/productos";

const ProductoContext = createContext();

export const useProducto = () => {
  const context = useContext(ProductoContext);
  if (!context) throw new Error("useProducto debe ser usado dentro de ProductoProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos

  // Función para obtener los productos desde el backend
  const getProductos = async () => {
    const res = await getProductosRequest();
    setProductos(res.data);
  };

  // Función para eliminar un producto
  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id);
      if (res.status === 204) setProductos(productos.filter((producto) => producto._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Función para crear un nuevo producto
  const createProducto = async (producto) => {
    try {
      const res = await createProductoRequest(producto);
      console.log(res.data);  // Esto te permitirá ver la respuesta exitosa
    } catch (error) {
      console.error("Error al crear el producto:", error.response ? error.response.data : error.message);
    }
  };
  

  // Función para obtener un producto por ID
  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar un producto
  const updateProducto = async (id, producto) => {
    try {
      await updateProductoRequest(id, producto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        deleteProducto,
        createProducto,
        getProducto,
        updateProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}
