import React from "react";
import ProductCard from "../../../../components/pos/productcard/ProductCard";
import mockProducts from "../../../../data/mockProducts"; // ajusta la ruta según tu estructura

const FeaturedProducts = () => {
  const products = mockProducts; // O aplicar filtros si es necesario

  return (
    <section className="py-10 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Mis productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
