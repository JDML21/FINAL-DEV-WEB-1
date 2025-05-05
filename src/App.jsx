import { Routes, Route } from 'react-router-dom';
import ClientLayout from './components/layouts/ClientLayout';
import HomePage from './pages/homepages/HomePage';
import ProductPage from './pages/products/ProductPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import CartPage from './pages/cart/CartPage.jsx';
import PerfilPage from './pages/profile/ProfilePage.jsx';
import HistoryPage from './pages/HistorySales/HistoryPage'; 
import PointsOfSalePage from './pages/pointsOfSale/PointsOfSalePage'; 

function App() {
  return (
    <Routes>
      {/* Layout principal que será usado en todas las páginas */}
      <Route path="/" element={<ClientLayout />}>
        {/* Ruta principal que carga la página de inicio */}
        <Route index element={<HomePage />} />
        
        {/* Rutas de las demás páginas */}
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="historial" element={<HistoryPage />} /> {/* NUEVA RUTA */}
        <Route path="puntos-de-venta" element={<PointsOfSalePage />} /> {/* NUEVA RUTA */}
      </Route>
    </Routes>
  );
}

export default App;
