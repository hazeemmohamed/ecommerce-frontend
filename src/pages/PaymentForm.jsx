import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import auth from "../config/firebase";
import { useEffect } from "react";

function PaymentForm({ cartItems, setCartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

const [user, setUser] = useState(null);

useEffect(() => {
  const unsub = auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });
  return () => unsub();
}, []);

  // const user = auth.currentUser.uid

  const [loading, setLoading] = useState(false);

 
const submitHandler = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    setLoading(true);

    const cleanCartItems = cartItems.map(item => ({
      price: Number(item.product.price), 
      quantity: Number(item.quantity),
    }));

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders/payment/process`,
      { cartItems: cleanCartItems }
    );

    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (result.error) {
      alert(result.error.message);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      const paymentInfo = {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status,
      };

      const orderAmount = cleanCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/order`, {
        userId: user.uid,
        cartItems: cartItems.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: Number(item.product.price),
          quantity: item.quantity,
        })),
        amount: orderAmount,
        paymentInfo,
      });

      setCartItems([]);
      alert("Payment successful!");
      navigate("/my-orders");
    }
  } catch (error) {
    console.error(error);
    alert("Payment failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={submitHandler}
      className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Card Payment</h2>

      <CardElement
        options={{ hidePostalCode: true }}
        className="p-3 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default PaymentForm;
