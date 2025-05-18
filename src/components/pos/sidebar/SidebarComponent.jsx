import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';

const SidebarComponent = ({ isExpanded }) => {
  const menuItems = [
    { icon: "mdi:home-outline", text: "Inicio", path: "/pos" },
    { icon: "mdi:cart-outline", text: "Ventas", path: "/pos/ventas" },
    { icon: "mdi:history", text: "Historial", path: "/pos/historial" },
    { icon: "mdi:package-variant", text: "Inventario", path: "/pos/inventario" }
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 bg-gray-800 text-white transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      <Sidebar>
        <div className="p-4 flex flex-col h-full">
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Icon icon={item.icon} className="w-6 h-6 min-w-[24px]" />
                    {isExpanded && (
                      <span className="ml-3 whitespace-nowrap">{item.text}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Sidebar>
    </aside>
  );
};

export default SidebarComponent;