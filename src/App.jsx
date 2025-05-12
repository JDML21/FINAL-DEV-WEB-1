import { Routes, Route } from "react-router-dom";
import ClientLayout from "./components/layouts/ClientLayout";
import POSLayout from './components/layouts/POSLayout';
import HomePage from "./pages/homepages/HomePage";
import ProductPage from "./pages/cliente/products/ProductPage";
import POSProductPage from "./pages/pos/productspos/ProductsposPage";
import CategoriesPage from "./pages/cliente/categories/CategoriesPage";
import InventoryPage from "./pages/pos/inventory/Inventorypospage.jsx";
import CartPage from "./pages/cliente/cart/CartPage.jsx";
import PerfilPage from "./pages/cliente/profile/ProfilePage.jsx";
import Editproductpage from "./pages/pos/Modify/Editproductpage";
import HistoryPage from "./pages/cliente/saleshistoryclient/saleshistoryclient.jsx";
import PointsOfSalePage from "./pages/cliente/pointsOfSale/PointsOfSalePage.jsx";
import POSHomePage from "./pages/pos/homepagespos/POSHomepage.jsx";
import Profilepagepos from "./pages/pos/profilePos/Profilepagepos.jsx";
import Saleshistorypos from "./pages/pos/saleshistorypos/Saleshistorypos.jsx";
import Sales from "./pages/pos/sales/Salespos.jsx";
import Newproduct from "./pages/pos/Newproduct/Newprorduct.jsx";

function App() {
  return (
    <Routes>
      {/*Cliente*/}
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        {/* Rutas de las demás páginas */}
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="historial" element={<HistoryPage />} />
        <Route path="puntos-de-venta" element={<PointsOfSalePage />} />{" "}
        
      </Route>

      {/* POS */}
      <Route path="/pos" element={<POSLayout />}>
        <Route index element={<POSHomePage />} />
        <Route path="products/:id" element={<POSProductPage />} />
        <Route path="inventario" element={<InventoryPage />} />
        <Route path="perfil" element={<Profilepagepos />} />
        <Route path="products/modificar/:id" element={<Editproductpage />} />
        <Route path="historial" element={<Saleshistorypos />} />
        <Route path="ventas" element={<Sales />} />
        <Route path="productos/agregar" element={<Newproduct />} />
      
        {/* <Route path="ventas" element={<VentasPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
