// src/context/ProductContext.jsx
import { createContext, useContext, useState } from "react";
import mockProducts from "../data/mockProducts"; // asegúrate de importar desde donde esté

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, ...updatedFields } : prod
      )
    );
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
