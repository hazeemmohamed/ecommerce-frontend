import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const amount = Number(
    cartItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0
    )
  ).toFixed(2);

  const increaseQty = (item) => {
    const updated = cartItems.map((i) =>
      i.product._id === item.product._id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
    setCartItems(updated);
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;

    const updated = cartItems.map((i) =>
      i.product._id === item.product._id
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    setCartItems(updated);
  };

  const removeCartItem = (item) => {
    const updated = cartItems.filter(
      (i) => i.product._id !== item.product._id
    );
    setCartItems(updated);
  };

  return cartItems.length > 0 ? (
    <Fragment>
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Total items: {totalItems}
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between border-b pb-4 mb-4"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p>${item.product.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeCartItem(item)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>

              <p className="font-bold">
                ${item.product.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold mt-6">
            <span>Total</span>
            <span>${amount}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </Fragment>
  ) : (
    <h1 className="text-center text-2xl p-10">Your cart is empty</h1>
  );
}

export default Cart;
