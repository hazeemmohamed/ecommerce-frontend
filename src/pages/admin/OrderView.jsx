import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OrderView() {
  const { id } = useParams();
  const navigate=useNavigate()

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch(() => alert("Failed to load order"));
  }, [id]);

  const updateStatus = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}/status`,
        { status }
      );
      alert("Order status updated successfully");
      navigate('/admin/orders')
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User ID:</strong> {order.userId}</p>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          {order.cartItems.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>

        <p className="font-bold">Total: ${order.amount}</p>

        <div>
          <label className="block font-semibold mb-1">Order Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Ordered">Ordered</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button
          onClick={updateStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

export default OrderView;
