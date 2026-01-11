import axios from "axios";
import { useState } from "react";
import React from "react";
import ProductForm from "../../components/ProductForm";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });

  // Handle input (text + file)
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  // Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Product added");
    navigate("/admin/products");
  };

  return (
    <ProductForm
      product={product}
      onSubmit={submitHandler}
      onChange={handleChange}
    />
  );
}

export default AddProduct;
