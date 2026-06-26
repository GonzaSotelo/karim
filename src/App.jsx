import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import "./index.css";
import WhatsAppButton from "./components/WhatsAppButton";



function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/producto/:id"
  element={<ProductDetail />}
/>
        <Route
        
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
      </Routes>
    <Footer/>
    <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;