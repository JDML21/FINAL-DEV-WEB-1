import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Buscar producto:", searchQuery);
      // Aquí podrías redirigir o activar un contexto de búsqueda
    }
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto px-4">
        {/* Nombre de la app */}
        <div className="flex justify-start mb-4">
          <Link to="/client" className="text-2xl font-bold text-white">
            FoodCampus
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-4">
          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar producto..."
              className="w-full px-3 py-1.5 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 text-sm"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Navegación */}
        <nav className="flex justify-center space-x-6">
          <Link to="/client/categorias" className="text-white hover:underline">
            Categorías
          </Link>
          <Link to="/client/puntos-de-venta" className="text-white hover:underline">
            Puntos de venta
          </Link>
          <Link to="/client/carrito" className="text-white hover:underline">
            Carrito de Compras
          </Link>
          <Link to="/client/historial" className="text-white hover:underline">
            Historial
          </Link>
          <Link to="/client/perfil" className="text-white hover:underline">
            Mi Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
