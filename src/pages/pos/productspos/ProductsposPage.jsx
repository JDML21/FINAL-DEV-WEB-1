import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mockProducts from '../../../data/mockProducts';

const ProducsposPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <p className="text-center mt-10">Cargando producto...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-xl text-primary font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Entrega estimada: {product.estimatedDelivery}</p>
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `Disponible (${product.stock} unidades)` : 'Agotado'}
          </p>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => navigate(`/pos/modificar/${product.id}`)}
              className="px-6 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600 transition"
            >
              Modificar
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded text-white bg-gray-500 hover:bg-gray-600 transition"
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducsposPage;
