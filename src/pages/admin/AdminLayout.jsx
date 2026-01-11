import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Add Product", path: "/admin/add-product" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition
                ${
                  location.pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* OVERLAY (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-xl font-semibold">
              {menu.find((m) => m.path === location.pathname)?.name || "Admin"}
            </h1>
          </div>

          <Link to="/" className="font-bold text-blue-600">
            MyShop
          </Link>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
