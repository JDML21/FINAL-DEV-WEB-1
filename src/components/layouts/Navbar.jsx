import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-blue-500 shadow-md h-16 flex items-center px-4">
      {/* Botón para sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 mr-4"
      >
        <Icon icon="mdi:menu" className="w-6 h-6 text-gray-700" />
      </button>

      {/* Nombre de la empresa (ahora clickeable) */}
      <Link 
        to="/pos" 
        className="flex-1 flex items-center hover:text-blue-600 transition-colors"
      >
        <h1 className="text-xl font-bold text-gray-800">Food-App</h1>
      </Link>

      {/* Iconos derecha */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Icon icon="mdi:bell-outline" className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Menú de perfil */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Icon icon="mdi:account-circle-outline" className="w-6 h-6 text-gray-700" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/pos/perfil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Perfil
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;