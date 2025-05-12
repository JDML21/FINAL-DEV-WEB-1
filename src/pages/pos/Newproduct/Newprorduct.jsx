import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProductPage({ onAddProduct }) {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct((prev) => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now().toString(), // Genera un ID simple
      ...product,
      price: `$${parseFloat(product.price).toFixed(2)}`,
      stock: parseInt(product.stock),
    };

    onAddProduct(newProduct); // Función recibida desde Inventory
    navigate("/pos/inventario");
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Nuevo producto</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Nombre del producto</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Cantidad disponible</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Precio</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Imágenes</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required
            />
            {product.image && (
              <img
                src={product.image}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover border rounded"
              />
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/pos/inventario")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Volver atrás
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProductPage;
