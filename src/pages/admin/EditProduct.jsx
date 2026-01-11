import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    existingImage: ""
  });

  // Fetch product
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => {
        setForm({
          name: res.data.product.name,
          price: res.data.product.price,
          description: res.data.product.description,
          image: null,
          existingImage: res.data.product.image
        });
        setLoading(false);
      })
      .catch(() => alert("Product not found"));
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Update product
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded"
        />

        {/* Existing Image Preview */}
        {form.existingImage && (
          <img
            src={form.existingImage}
            alt="Product"
            className="h-32 object-cover rounded"
          />
        )}

        {/* Upload New Image */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex-1 border py-3 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
