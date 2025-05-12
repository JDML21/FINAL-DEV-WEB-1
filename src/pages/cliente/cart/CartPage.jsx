import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, addToPurchaseHistory } = useCart();
  const navigate = useNavigate();
  const shippingCost = cartItems.length > 0 ? 5000 : 0;

  // Calcular total de productos y precios
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const productsTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = productsTotal + shippingCost;

  // Estado para el modal de confirmación de pedido
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleBuyOne = (item) => {
    alert(`Compra confirmada para ${item.name}`);
    // Aquí puedes implementar la lógica específica luego
  };

  const handleConfirmPurchase = () => {
    console.log("Confirmando compra...");
    const newOrderId = 'ORD-' + Date.now();
    const newOrder = {
      orderId: newOrderId,
      items: cartItems,
      total: total,
      date: new Date().toISOString()
    };

    addToPurchaseHistory(newOrder); // Usamos la función ahora con el nombre correcto
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    clearCart(); // Vaciar el carrito después de confirmar el pedido
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* Lista de productos */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>

        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p
                    className="text-sm text-blue-600 cursor-pointer mt-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </p>
                  <p
                    className="text-sm text-green-600 cursor-pointer mt-1"
                    onClick={() => handleBuyOne(item)}
                  >
                    Comprar ahora
                  </p>
                </div>
              </div>

              {/* Contador de cantidad y stock */}
              <div className="flex flex-col items-center space-y-1 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500">Stock: {item.stock}</p>
              </div>

              {/* Precio */}
              <div className="text-right mt-4 md:mt-0">
                <p className="text-lg font-bold">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen de compra */}
      <div className="bg-white shadow p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
        <div className="flex justify-between mb-2">
          <span>Producto ({totalQuantity})</span>
          <span>${productsTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Envío ({cartItems.length > 0 ? "1" : "0"})</span>
          <span>${shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <button
          onClick={handleConfirmPurchase}
          disabled={cartItems.length === 0}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirmar compra
        </button>
      </div>

      {/* Modal de confirmación de pedido */}
      {orderConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center max-w-sm w-full shadow-lg">
            <div className="text-green-600 text-5xl mb-4">✔️</div>
            <h2 className="text-2xl font-bold mb-2">¡Pedido confirmado!</h2>
            <p className="mb-1">Tu compra ha sido aceptada.</p>
            <p className="mb-4">El número de tu pedido es <span className="font-semibold">{orderId}</span></p>
            <button
              onClick={() => {
                setOrderConfirmed(false);
                navigate('/'); // Te lleva al Home
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Volver a la Página Principal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
