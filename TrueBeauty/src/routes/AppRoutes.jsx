import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Contact from "../pages/Contact.jsx";
import About from "../pages/About.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import AdminUsers from "../pages/AdminUsers.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products/:id" element={<ProductDetail />} />

      <Route path="/products" element={<Products />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/about" element={<About />} />

      <Route path="/admin-products" element={<AdminProducts />} />

      <Route path="/admin-users" element={<AdminUsers />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
