import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductList from "./pages/admin/ProductList";
import MainLayout from "./pages/MainLayout";
import AdminRoute from "./route/AdminRoute";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import PrivateRoute from "./route/PrivateRoute";
import Orders from "./pages/admin/Orders";
import OrderView from "./pages/admin/OrderView";

function App() {
   const [products, setProducts] = useState([])
   const [searchParams, setSearchParams] = useSearchParams()
   const [cartItems,setCartItems]= useState([])

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/products?${searchParams.toString()}`)
        .then(res => res.json())
        .then(res => setProducts(res.products))
    },[searchParams])
  return (
    <>

      <Routes>
       
        <Route element={<MainLayout cartItems={cartItems} setCartItems={setCartItems} />}>
      <Route path="/" element={<Products products={products}/>} />
      <Route path="/product/:id" element={<ProductDetails products={products} cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/cart" element={<PrivateRoute><Cart cartItems={cartItems} setCartItems={setCartItems} /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Products/>}/>
      <Route path="/checkout" element={<PrivateRoute><Checkout cartItems={cartItems} setCartItems={setCartItems}/></PrivateRoute>}/>
      <Route path="my-orders" element={<MyOrders products = {products}/>}/>
    </Route>

       
       <Route path="/admin" element={<AdminRoute />}>
  <Route element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="products" element={<ProductList />} />
    <Route path="add-product" element={<AddProduct />} />
    <Route path="edit-product/:id" element={<EditProduct />} />
    <Route path="orders" element={<Orders/>}/>
    <Route path="orders/:id" element={<OrderView cartItems={cartItems}/>}/>
  </Route>
</Route>

      </Routes>
    </>
  );
}

export default App;
