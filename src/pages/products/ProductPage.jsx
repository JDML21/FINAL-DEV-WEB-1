import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import mockProducts from '../../data/mockProducts';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Cargar reseñas desde localStorage
    const storedReviews = localStorage.getItem(`reviews_${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Producto agregado al carrito');
  };

  const handleBuyNow = () => {
    addToCart(product);
    alert('Producto agregado al carrito y redirigiendo...');
    navigate('/carrito');
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review = {
      ...newReview,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);

    // Guardar en localStorage
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setNewReview({ name: '', rating: 5, comment: '' });
  };

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

      {/* Sección de reseñas */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Agregar una reseña</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={newReview.name}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="rating"
            value={newReview.rating}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} estrellas
              </option>
            ))}
          </select>
          <textarea
            name="comment"
            placeholder="Tu reseña"
            value={newReview.comment}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar reseña
          </button>
        </form>

        <h3 className="text-xl font-semibold mt-8 mb-4">Reseñas</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">Aún no hay reseñas.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="border rounded p-4 bg-white">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-yellow-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
