import { createContext, useContext, useState } from "react";
import {
  createSaleRequest,
  deleteSaleRequest,
  getSalesRequest,
  getSaleRequest,
  updateSaleRequest,
} from "../api/sales";

const SaleContext = createContext();

export const useSales = () => {
  const context = useContext(SaleContext);
  if (!context) throw new Error("useSales must be used within a SaleProvider");
  return context;
};

export function SaleProvider({ children }) {
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const res = await getSalesRequest();
    setSales(res.data);
  };

  const deleteSale = async (id) => {
    try {
      const res = await deleteSaleRequest(id);
      if (res.status === 204) setSales(sales.filter((sale) => sale._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createSale = async (sale) => {
    try {
      const res = await createSaleRequest(sale);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSale = async (id) => {
    try {
      const res = await getSaleRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSale = async (id, sale) => {
    try {
      await updateSaleRequest(id, sale);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SaleContext.Provider
      value={{
        sales,
        getSales,
        deleteSale,
        createSale,
        getSale,
        updateSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}