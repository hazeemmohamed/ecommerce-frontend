import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import React from "react";

const stripePromise = loadStripe(`${import.meta.env.VITE_API_URL}`);

function Checkout({ cartItems, setCartItems }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm cartItems={cartItems} setCartItems={setCartItems} />
    </Elements>
  );
}

export default Checkout;
