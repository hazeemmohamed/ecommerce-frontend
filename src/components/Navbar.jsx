import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { signOut } from "firebase/auth";
import auth from "../config/firebase";

const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

function Navbar({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [log, setLog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLog(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCartItems([]);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky  top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          MyShop
        </Link>

        {/* Search (Desktop only) */}
        <div className="hidden md:block w-1/3">
          <Search />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>

            {log ? (
              <button onClick={logout} className="text-gray-700 hover:text-blue-600">
                Logout
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-blue-600">
                Login
              </button>
            )}

            {user && user.uid !== ADMIN_UID && (
              <Link to="/my-orders" className="text-gray-700 hover:text-blue-600">
                My Orders
              </Link>
            )}

            {user && user.uid === ADMIN_UID && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}
          </div>

          {/* Cart (Always visible) */}
          <Link to="/cart" className="relative flex items-center text-gray-700">
            🛒
            <span className="ml-1 hidden md:inline">Cart</span>
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartItems.length}
            </span>
          </Link>

          {/* Hamburger (Mobile only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Products
          </Link>

          {!log && (
            <button onClick={() => { navigate("/login"); setMenuOpen(false); }}>
              Login
            </button>
          )}

          {log && (
            <button onClick={logout} className="block text-left w-full">
              Logout
            </button>
          )}

          {user && user.uid !== ADMIN_UID && (
            <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
              My Orders
            </Link>
          )}

          {user && user.uid === ADMIN_UID && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
