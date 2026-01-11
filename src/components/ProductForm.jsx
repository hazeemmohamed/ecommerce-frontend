import React from "react";

function ProductForm({ product, onSubmit, onChange, isEdit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      <input
        name="name"
        value={product.name}
        onChange={onChange}
        placeholder="Product Name"
        className="w-full mb-4 p-3 border rounded"
      />

      <input
        name="price"
        value={product.price}
        onChange={onChange}
        placeholder="Price"
        type="number"
        className="w-full mb-4 p-3 border rounded"
      />      

      <textarea
        name="description"
        value={product.description}
        onChange={onChange}
        placeholder="Description"
        className="w-full mb-4 p-3 border rounded"
      />
      <input
        type="file"
        name="image"
        onChange={onChange}
        className="w-full mb-4"
      />


      <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
