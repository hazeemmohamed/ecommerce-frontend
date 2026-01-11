import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    paid: 0,
    packed: 0,
    shipped: 0,
    delivered: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>

        {/* TOTAL ORDERS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        {/* PAID */}
        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Paid Orders</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.paid}
          </p>
        </div>

        {/* PACKED */}
        <div className="bg-purple-50 p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Packed</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.packed}
          </p>
        </div>

        {/* SHIPPED */}
        <div className="bg-yellow-50 p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Shipped</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.shipped}
          </p>
        </div>

        {/* DELIVERED */}
        <div className="bg-green-50 p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Delivered</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.delivered}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
