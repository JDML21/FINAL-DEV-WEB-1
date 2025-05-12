import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockProducts from "../../../data/mockProducts";

const Inventorypospage = () => {
  const [products, setProducts] = useState(
    mockProducts.map((p) => ({ ...p, isPaused: false }))
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory ? product.category === filterCategory : true)
    )
    .sort((a, b) => {
      if (sortOrder === "alfabetico") return a.name.localeCompare(b.name);
      if (sortOrder === "letra") return a.name[0].localeCompare(b.name[0]);
      return 0;
    });

  const toggleProductSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (!selectedProducts.includes(p.id)) return p;
        if (action === "pausar") return { ...p, isPaused: true };
        if (action === "reactivar") return { ...p, isPaused: false };
        return p;
      })
    );
    if (action === "eliminar") {
      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.id))
      );
    }
    if (action === "modificar" && selectedProducts.length === 1) {
      navigate(`/pos/products/modificar/${selectedProducts[0]}`);
    }
    setSelectedProducts([]);
  };

  const handleDownloadInventory = () => {
    console.log("Descargando inventario...");
  };

  const handleAddNewProduct = () => {
    navigate("/pos/productos/agregar");
  };

  const handleViewProduct = (id) => {
    navigate(`/pos/products/${id}`);
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Inventario</h2>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Filtrar por Categoría</option>
            <option value="bebida">Bebida</option>
            <option value="postre">Postre</option>
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Ordenar por</option>
            <option value="alfabetico">Orden alfabético</option>
            <option value="letra">Orden por letra</option>
          </select>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap justify-center gap-3">
          {[{ label: "Pausar", color: "bg-gray-600", action: "pausar" },
            { label: "Reactivar", color: "bg-blue-600", action: "reactivar" },
            { label: "Eliminar", color: "bg-red-600", action: "eliminar" },
            { label: "Modificar", color: "bg-yellow-500", action: "modificar" },
          ].map(({ label, color, action }) => (
            <button
              key={action}
              onClick={() => handleBulkAction(action)}
              className={`${color} text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleDownloadInventory}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
          >
            Descargar Inventario
          </button>
          <button
            onClick={handleAddNewProduct}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
          >
            Agregar Producto
          </button>
        </div>

        {/* Lista de productos tipo cards */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`relative border rounded-lg p-4 flex items-center gap-4 bg-gray-50 shadow-sm ${
                product.isPaused ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleProductSelect(product.id)}
                className="absolute top-3 left-3 w-5 h-5"
              />
              <img
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 rounded object-cover border"
              />
              <div className="flex-1 pl-8">
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-sm text-gray-600">ID: {product.id}</p>
                <p className="text-sm text-gray-600">Precio: ${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => handleViewProduct(product.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventorypospage;
