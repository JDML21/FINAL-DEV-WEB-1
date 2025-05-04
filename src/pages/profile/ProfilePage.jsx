import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHistory,
  FaCreditCard,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";
import flecha from "../../assets/images/flecha.png";
import profileImg from "../../assets/images/profile.jpg";

function ProfilePage() {
  const user = {
    name: "Juan Pérez",
    email: "juanperez@example.com",
    picture: profileImg,
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
          <Link to="/historial" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaHistory />
            <span>Historial de compras</span>
          </Link>
          <Link to="/perfil" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
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
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <img
            src={user.picture}
            alt="picture de perfil"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        {/* Opciones de perfil */}
        <div className="space-y-4">
          {/* Tu información */}
          <Link
            to="/perfil/informacion"
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow"
          >
            <div className="flex items-center space-x-4">
              <FaInfoCircle className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Tu información</h3>
                <p className="text-sm text-gray-600">
                  name del usuario y datos de identificación
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4" />
          </Link>

          {/* Datos de la cuenta */}
          <Link
            to="/perfil/cuenta"
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow"
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
          </Link>

          {/* Método de pago */}
          <Link
            to="/perfil/metodo-pago"
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow"
          >
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Método de pago</h3>
                <p className="text-sm text-gray-600">Métodos de pago agregados</p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
