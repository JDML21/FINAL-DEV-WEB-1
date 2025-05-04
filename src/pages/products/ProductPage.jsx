import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // Importar el hook
import mockProducts from '../../data/mockProducts'; // Importar los productos

const ProductPage = () => {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Hook para acceder al contexto del carrito
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Buscar el producto en el mockProducts por id
    const foundProduct = mockProducts.find((p) => p.id === parseInt(id)); // Asegúrate de convertir `id` a número
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // Agregar el producto al carrito
    alert('Producto agregado al carrito');
  };

  const handleBuyNow = () => {
    addToCart(product); // Agregar el producto al carrito
    alert('Producto agregado al carrito y redirigiendo...');
    navigate('/carrito'); // Redirigir al carrito
  };

  if (!product) return <p className="text-center mt-10">Cargando producto...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Imagen del producto */}
      <div>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.description}</p>
        <p className="text-xl text-primary font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Entrega estimada: {product.estimatedDelivery}</p>
        <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `Disponible (${product.stock} unidades)` : 'Agotado'}
        </p>

        {/* Botones para agregar al carrito o comprar ahora */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded text-white transition ${
              product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Agregar al carrito
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded text-white transition ${
              product.stock > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
