import { useEffect, useState } from "react";
import axios from "axios";
import auth from "../config/firebase";
import React from "react";

function MyOrders({products = []}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  const orderSteps = ["Ordered", "Packed", "Shipped", "Delivered"];

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders/my/${user.uid}`)
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Please login to view your orders
      </p>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      )}

      {orders.map((order) => {
        const currentStep = Math.max(
          orderSteps.indexOf(order.status),
          0
        );

        return (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg mb-8 p-6"
          >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold break-all">{order._id}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Packed"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "Ordered"}
              </span>
            </div>

            {/* ORDER PROGRESS */}
            <div className="flex justify-between items-center mb-6">
              {orderSteps.map((step, index) => (
                <div key={step} className="flex-1 text-center">
                  <div
                    className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium ${
                      index <= currentStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
  {order.cartItems?.map((item, index) => {
    // 🔹 Step 1: Detect product source
    const name =
      item.name ||
      item.product?.name ||
      "Product";

    const price =
      Number(item.price) ||
      Number(item.product?.price) ||
      0;

    const quantity = Number(item.quantity) || 1;

    // 🔹 Step 2: Calculate subtotal
    const subtotal = price * quantity;

    return (
      <div
        key={index}
        className="flex justify-between items-center text-sm"
      >
        <div>
          <p className="font-medium text-gray-800">
            {name}
          </p>
          <p className="text-gray-500">
            Qty: {quantity} × ${price}
          </p>
        </div>

        <p className="font-semibold text-gray-900">
          ${subtotal}
        </p>
      </div>
    );
  })}
</div>

 

            {/* FOOTER */}
            <div className="border-t mt-4 pt-4 flex flex-col md:flex-row md:justify-between md:items-center">
              <p className="font-bold text-lg">
                Total: ${order.amount || 0}
              </p>

              {order.paymentInfo && (
                <p className="text-sm text-gray-600 mt-2 md:mt-0">
                  Payment:{" "}
                  <span className="font-semibold text-green-600">
                    {order.paymentInfo.status}
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyOrders;
