import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHistory, FaInfoCircle, FaCog } from "react-icons/fa";
import flecha from "../../../assets/images/flecha.png";
import profileImg from "../../../assets/images/profile.jpg";

function ProfilePOS() {
  const user = {
    name: "Operador POS",
    email: "operador@punto-venta.com",
    picture: profileImg,
  };

  const [modal, setModal] = useState(null);
  const [nombre, setNombre] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState("operador_01");
  const [password, setPassword] = useState("");

  const closeModal = () => setModal(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
    closeModal();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-blue-600 font-semibold text-lg">
            <FaUser />
            <span>POS</span>
          </div>
          <Link
            to="/pos/historial"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaHistory />
            <span>Historial de ventas</span>
          </Link>
          <Link
            to="/pos/perfil"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaUser />
            <span>Mi Perfil</span>
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 bg-white">
        {/* Usuario */}
        <div className="flex items-center justify-between bg-gray-100 p-6 rounded-lg mb-6 shadow">
          <div>
            <h2 className="text-xl font-bold">{nombre}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
          <img
            src={user.picture}
            alt="Perfil"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        {/* Opciones */}
        <div className="space-y-4">
          <div
            onClick={() => setModal("informacion")}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaInfoCircle className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Información personal</h3>
                <p className="text-sm text-gray-600">
                  Nombre y contacto del operador
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4" />
          </div>

          <div
            onClick={() => setModal("cuenta")}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaCog className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Configuración de cuenta</h3>
                <p className="text-sm text-gray-600">
                  Cambiar usuario o contraseña
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4" />
          </div>
        </div>
      </main>

      {/* MODALES */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modal === "informacion"
                ? "Editar Información Personal"
                : "Configuración de Cuenta"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modal === "informacion" && (
                <>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Nombre"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                  />
                </>
              )}

              {modal === "cuenta" && (
                <>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Nombre de usuario"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Nueva contraseña"
                  />
                </>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePOS;
