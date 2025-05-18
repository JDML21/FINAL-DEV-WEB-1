import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarComponent from '../pos/sidebar/SidebarComponent';
import Navbar from './Navbar';

const POSLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar fijo en la parte superior */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Contenedor principal */}
      <div className="pt-16 flex"> {/* pt-16 para compensar el navbar fijo */}
        {/* Sidebar */}
        <SidebarComponent isExpanded={isSidebarExpanded} />

        {/* Contenido principal */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarExpanded ? 'ml-64' : 'ml-20'
          } p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default POSLayout;