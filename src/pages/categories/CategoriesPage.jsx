import React, { useState } from "react";
import { Link } from "react-router-dom";
import mockProducts from "../../data/mockProducts";

function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortOption, setSortOption] = useState("");

  // Filtrar por categoría
  const filteredProducts = mockProducts.filter((product) =>
    selectedCategory === "todos" ? true : product.category === selectedCategory
  );

  // Ordenar según opción seleccionada
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "precio") return a.price - b.price;
    if (sortOption === "valoracion") return b.rating - a.rating;
    return 0;
  });

  // Categorías únicas desde los productos
  const categories = [
    "todos",
    ...new Set(mockProducts.map((product) => product.category)),
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categorías de Productos</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2 items-center">
          <label className="font-medium">Categoría:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-medium">Ordenar por:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Ninguno</option>
            <option value="precio">Precio (menor a mayor)</option>
            <option value="valoracion">Mejor valorados</option>
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-600 capitalize">
                Categoría: {product.category}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
