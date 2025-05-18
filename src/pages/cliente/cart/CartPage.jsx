import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, addToPurchaseHistory } = useCart();
  const navigate = useNavigate();
  const shippingCost = cartItems.length > 0 ? 5000 : 0;

  // Calcular total de productos y precios
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const productsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = productsTotal + shippingCost;

  // Estado para el modal de confirmación de pedido
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleBuyOne = (item) => {
    alert(`Compra confirmada para ${item.name}`);
  };

  const handleConfirmPurchase = () => {
    const newOrderId = 'ORD-' + Date.now();
    const newOrder = {
      orderId: newOrderId,
      items: cartItems,
      total,
      date: new Date().toISOString()
    };

    addToPurchaseHistory(newOrder);
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Lista de productos */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 italic">No hay productos en el carrito.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
                
                {/* Imagen y detalles */}
                <div className="flex items-center space-x-4">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex space-x-4 mt-2">
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 hover:text-red-800 transition-colors">Eliminar</button>
                      <button onClick={() => handleBuyOne(item)} className="text-sm text-green-600 hover:text-green-800 transition-colors">Comprar ahora</button>
                    </div>
                  </div>
                </div>

                {/* Contador de cantidad */}
                <div className="flex flex-col items-center space-y-1 mt-4 md:mt-0">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">-</button>
                    <span className="font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">+</button>
                  </div>
                  <p className="text-xs text-gray-500">Disponible: {item.stock}</p>
                </div>

                {/* Precio */}
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen de compra */}
        <div className="bg-white shadow-lg p-6 rounded-lg h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Productos</span>
              <span className="font-medium">({totalQuantity}) ${productsTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-medium">${shippingCost.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleConfirmPurchase} disabled={cartItems.length === 0} className={`w-full mt-6 py-3 rounded-lg text-white font-medium transition-colors ${cartItems.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}>
              Confirmar compra
            </button>
          </div>
        </div>

        {/* Modal de confirmación */}
        {orderConfirmed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center max-w-md w-full shadow-xl">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold mb-3">¡Pedido confirmado!</h2>
              <p className="mb-5 text-gray-600">
                Tu número de pedido es: <br />
                <span className="font-mono bg-gray-100 px-3 py-2 rounded-lg inline-block mt-2">{orderId}</span>
              </p>
              <button onClick={() => { setOrderConfirmed(false); navigate('/client'); }} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
