import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaSearch } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

function PointsOfSalePage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [pointsOfSale, setPointsOfSale] = useState([
    { id: 1, name: "Dulcería La Casa", category: "Dulces", lat: 4.6097, lng: -74.0818 },
    { id: 2, name: "Bebidas Express", category: "Bebidas", lat: 4.6112, lng: -74.0813 },
    { id: 3, name: "Tienda ABC", category: "Ropa", lat: 4.6077, lng: -74.0820 },
    // Puedes agregar más puntos de venta aquí
  ]);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  // Filtramos los puntos de venta según la categoría y la búsqueda
  const filteredPoints = pointsOfSale.filter(
    (point) =>
      (category === "" || point.category === category) &&
      point.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Filtros */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <div className="space-y-6">
          <div className="flex items-center text-xl font-semibold text-blue-600">
            <FaSearch />
            <span className="ml-2">Buscar puntos de venta</span>
          </div>

          {/* Filtro de categoría */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Categoría</h3>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas</option>
              <option value="Dulces">Dulces</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Ropa">Ropa</option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Buscar local</h3>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </aside>

      {/* Mapa */}
      <main className="flex-1 p-8 bg-white">
        <MapContainer center={[4.6097, -74.0818]} zoom={14} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Marcadores de los puntos de venta */}
          {filteredPoints.map((point) => (
            <Marker key={point.id} position={[point.lat, point.lng]}>
              <Popup>
                <h3>{point.name}</h3>
                <p>{point.category}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  );
}

export default PointsOfSalePage;
