import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../config/firebase";

// const products = [
//   {
//     id: 1,
//     name: "MacBook Pro",
//     price: 1800,
//     description:
//       "The MacBook Pro delivers exceptional performance with its powerful processor, stunning Retina display, long battery life, and premium aluminum design. Ideal for developers, designers, and power users.",
//     features: [
//       "M-Series Chip",
//       "16GB RAM",
//       "512GB SSD",
//       "Retina Display",
//       "All-day Battery Life"
//     ]
//   }
// ];

function ProductDetails({ products = [], cartItems, setCartItems }) {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  const navigate= useNavigate()
  const [user, setUser] = useState(null)

  useEffect(()=>{
      window.scrollTo(0, 0);

      const loggedUser = auth.onAuthStateChanged((currentUser)=>{
        setUser(currentUser)
      })
      return loggedUser
  },[])

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => {
    if(quantity > 1){ 
      setQuantity((q) => q - 1)
    }
  }

  const handleAddToCart = () => {
    if(!user){
      {
        alert("Login to add the Items to your cart")
          window.scrollTo(0, 0);

        navigate('/login')
        return
      }
    }

    const existing = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (!existing) {
      setCartItems((prev) => [...prev, { product, quantity }]);
    }
  };

  return (
  <div className="bg-gray-50 min-h-screen px-4 py-10">
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-xl w-full max-w-md h-[420px] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full object-contain p-6 hover:scale-105 transition"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-2xl text-blue-600 font-bold mt-3">
            ${product.price}
          </p>

          <p className="text-gray-700 mt-6 leading-relaxed whitespace-pre-line break-words max-w-xl">
  {product.description}
</p>


          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQty}
                className="w-9 h-9 border rounded-md text-lg hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                onClick={increaseQty}
                className="w-9 h-9 border rounded-md text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default ProductDetails;

