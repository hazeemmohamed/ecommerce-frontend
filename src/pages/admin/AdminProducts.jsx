import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import auth from "../../config/firebase";

function AdminProducts({products, setProducts}) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/products")
  //     .then(res => setProducts(res.data.products));
  // }, []);

  const navigate = useNavigate()
  // useEffect(()=>{
  //   auth.onAuthStateChanged((user)=>{
  //     if (user.uid === 'xP1OPGz6cvOIInLm4ynomBiRyBi2'){
  //       navigate('/admin')
  //     }
  //     else{
  //       navigate('/')
  //     }
  //   })
  // },[])
  const deleteProduct = async (id) => {
    if (confirm("Delete this product?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Product
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3 flex gap-3 justify-center">
                <Link
                  to={`/admin/edit-product/${p._id}`}
                  className="text-blue-600">Edit</Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
