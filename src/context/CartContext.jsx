import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const storedHistory = localStorage.getItem('purchaseHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [cart, purchaseHistory]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(newQuantity, item.stock)),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ✅ Recibe un pedido completo (con id, items, total, fecha...)
  const addToPurchaseHistory = (order) => {
    setPurchaseHistory((prevHistory) => [...prevHistory, order]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToPurchaseHistory,
        purchaseHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
