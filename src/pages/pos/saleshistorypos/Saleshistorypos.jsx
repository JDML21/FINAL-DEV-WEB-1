import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHistory, FaSearch, FaFileDownload } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

function SalesHistory() {
  const [search, setSearch] = useState("");
  const { purchaseHistory } = useCart();

  const filteredSales = purchaseHistory?.filter((venta) =>
    venta.products?.some((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  ) || [];

  return (
    <div className="flex min-h-screen">
   
      {/* Contenido */}
      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">Historial de Ventas</h2>

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

        {/* Lista de ventas */}
        <div className="space-y-6">
          {filteredSales.length > 0 ? (
            filteredSales.map((venta) => (
              <div
                key={venta.id}
                className="bg-gray-100 p-6 rounded-lg shadow flex flex-col gap-2"
              >
                <p className="text-sm text-gray-600 mb-1">
                  Fecha: {venta.date}
                </p>
                <div className="flex gap-6">
                  <img
                    src={venta.products?.[0]?.image || "/placeholder.jpg"}
                    alt={venta.products?.[0]?.name || "Producto"}
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="font-semibold">Estado: </span>
                      <span
                        className={`${
                          venta.status === "Pendiente"
                            ? "text-yellow-600"
                            : venta.status === "En camino"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {venta.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {venta.products?.[0]?.description || "Sin descripción"}
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Ver venta
                      </button>
                      <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                        Repetir venta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay historial de ventas.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default SalesHistory;
