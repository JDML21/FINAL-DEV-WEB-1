import { createContext, useContext, useState } from "react";
import mockProducts from "../data/mockProducts";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id.toString() === id.toString() ? { ...prod, ...updatedFields } : prod
      )
    );
  };

  const getProductById = (id) => {
    return products.find((p) => p.id.toString() === id.toString());
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext debe usarse dentro de un ProductProvider");
  }
  return context;
};