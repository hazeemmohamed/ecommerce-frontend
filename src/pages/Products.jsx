import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";
  const page = Number(query.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products?keyword=${keyword}&page=${page}`
      );

      setProducts(data.products);
      setPages(data.pages);
    };

    fetchProducts();
  }, [keyword, page]);

  const changePage = (newPage) => {
    navigate(`/?keyword=${keyword}&page=${newPage}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Featured Products
      </h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-52 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                <img
                  src={
                    p.image
                      ? `${import.meta.env.VITE_API_URL}${p.image}`
                      : "/no-image.png"
                  }
                  alt={p.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold truncate">
                  {p.name}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {p.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-xl font-bold text-blue-600">
                    ${p.price}
                  </span>

                  <Link
                    to={`/product/${p._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => changePage(x + 1)}
              className={`px-4 py-2 border rounded ${
                page === x + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {x + 1}
            </button>
          ))}

          <button
            disabled={page === pages}
            onClick={() => changePage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
