import React, { useState } from "react";
import {
  FaUser,
  FaHistory,
  FaCreditCard,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";
import flecha from "../../../assets/images/flecha.png";
import profileImg from "../../../assets/images/profile.jpg";

function ProfilePage() {
  const user = {
    name: "Juan Pérez",
    email: "juanperez@example.com",
    picture: profileImg,
  };

  const [modal, setModal] = useState(null); // puede ser: 'informacion', 'cuenta', 'metodo'

  // Formularios controlados
  const [nombre, setNombre] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState("juan_perez");
  const [password, setPassword] = useState("");
  const [tarjeta, setTarjeta] = useState("**** **** **** 1234");

  const closeModal = () => setModal(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
    closeModal();
  };

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-blue-600 font-semibold text-lg">
            <FaUser />
            <span>Mi Perfil</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaHistory />
            <span>Historial de compras</span>
          </div>
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

        {/* Opciones de perfil */}
        <div className="space-y-4">
          <div
            onClick={() => setModal("informacion")}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaInfoCircle className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Tu información</h3>
                <p className="text-sm text-gray-600">
                  Nombre del usuario y datos de identificación
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
                <h3 className="font-semibold">Datos de la cuenta</h3>
                <p className="text-sm text-gray-600">
                  Datos que representan a la cuenta en la aplicación
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4" />
          </div>

          <div
            onClick={() => setModal("metodo")}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Método de pago</h3>
                <p className="text-sm text-gray-600">Métodos de pago agregados</p>
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
                : modal === "cuenta"
                ? "Editar Datos de Cuenta"
                : "Editar Método de Pago"}
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

              {modal === "metodo" && (
                <>
                  <input
                    type="text"
                    value={tarjeta}
                    onChange={(e) => setTarjeta(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Número de tarjeta"
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

export default ProfilePage;
