import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/all-orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3 break-all">{order._id}</td>
                <td className="p-3 font-semibold">${order.amount}</td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-xs">
                    {order.paymentInfo?.status || "N/A"}
                  </span>
                </td>

                <td className="p-3">
                  <StatusBadge status={order.status} />
                </td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-4 space-y-3"
          >
            <p className="text-xs text-gray-500 break-all">
              Order ID: {order._id}
            </p>

            <div className="flex justify-between items-center">
              <p className="font-semibold">${order.amount}</p>
              <StatusBadge status={order.status} />
            </div>

            <p className="text-sm text-gray-600">
              Payment:{" "}
              <span className="font-medium">
                {order.paymentInfo?.status || "N/A"}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <Link
              to={`/admin/orders/${order._id}`}
              className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Order
            </Link>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No orders found
        </p>
      )}
    </div>
  );
}

/* ===== STATUS BADGE COMPONENT ===== */
function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "Delivered"
          ? "bg-green-100 text-green-700"
          : status === "Shipped"
          ? "bg-blue-100 text-blue-700"
          : status === "Packed"
          ? "bg-purple-100 text-purple-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
}

export default Orders;
