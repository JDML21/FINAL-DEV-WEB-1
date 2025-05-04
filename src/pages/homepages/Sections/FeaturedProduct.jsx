import ProductCard from '../../../components/productcard/ProductCard';
import mockProducts from '../../../data/mockProducts';
const FeaturedProducts = () => {
  // Opcional: filtrar si solo algunos son "destacados"
  const products = mockProducts; // o mockProducts.filter(p => p.featured)

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
