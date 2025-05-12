import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHistory, FaSearch, FaFileDownload } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

function HistoryPage() {
  const [search, setSearch] = useState("");
  const { purchaseHistory } = useCart();

  // Filtrar el historial según la búsqueda, validando que "products" exista
  const filteredHistory = purchaseHistory?.filter((pedido) =>
    pedido.products?.some((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  ) || [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-blue-600 font-semibold text-lg">
            <FaUser />
            <span>Mi Perfil</span>
          </div>
          <Link
            to="/historial"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaHistory />
            <span>Historial de compras</span>
          </Link>
          <Link
            to="/perfil"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaUser />
            <span>Mi Perfil</span>
          </Link>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">Historial de Compras</h2>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center border rounded px-3 py-1">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none"
            />
          </div>

          <div>
            <label className="font-semibold mr-2">Filtrar y ordenar:</label>
            <select className="border rounded px-2 py-1">
              <option>Estado del pedido</option>
              <option>Nombre</option>
            </select>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Descargar - Excel
          </button>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-6">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-gray-100 p-6 rounded-lg shadow flex flex-col gap-2"
              >
                <p className="text-sm text-gray-600 mb-1">
                  Fecha: {pedido.date}
                </p>
                <div className="flex gap-6">
                  <img
                    src={pedido.products?.[0]?.image || "/placeholder.jpg"}
                    alt={pedido.products?.[0]?.name || "Producto"}
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="font-semibold">Estado: </span>
                      <span
                        className={`${
                          pedido.status === "Pendiente"
                            ? "text-yellow-600"
                            : pedido.status === "En camino"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {pedido.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {pedido.products?.[0]?.description || "Sin descripción"}
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Ver compra
                      </button>
                      <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                        Volver a comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay historial de compras.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;
