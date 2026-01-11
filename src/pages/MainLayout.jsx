import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import auth from "../config/firebase";

function MainLayout({cartItems,setCartItems}) {
  const { pathname } = useLocation();
  const navigate = useNavigate()


  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar cartItems={cartItems} setCartItems={setCartItems} />}
      <Outlet />
      {!isAdmin && <Footer />}
    </>
  );
}

export default MainLayout;
