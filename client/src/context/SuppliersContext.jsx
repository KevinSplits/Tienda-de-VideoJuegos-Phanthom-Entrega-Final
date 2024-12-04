import { createContext, useContext, useState } from "react";
import {
  createSupplierRequest,
  deleteSupplierRequest,
  getSuppliersRequest,
  getSupplierRequest,
  updateSupplierRequest,
} from "../api/suppliers";

const SupplierContext = createContext();

export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (!context) throw new Error("useSuppliers must be used within a SupplierProvider");
  return context;
};

export function SupplierProvider({ children }) {
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = async () => {
    const res = await getSuppliersRequest();
    setSuppliers(res.data);
  };

  const deleteSupplier = async (id) => {
    try {
      const res = await deleteSupplierRequest(id);
      if (res.status === 204) setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createSupplier = async (supplier) => {
    try {
      const res = await createSupplierRequest(supplier);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSupplier = async (id) => {
    try {
      const res = await getSupplierRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSupplier = async (id, supplier) => {
    try {
      await updateSupplierRequest(id, supplier);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        getSuppliers,
        deleteSupplier,
        createSupplier,
        getSupplier,
        updateSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}