import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";

function ProductDetail() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const pageFrom = searchParams.get("page") || 1;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await fetchProductById(productId);
      setProduct(res.data.data);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <button
        onClick={() => navigate(`/?page=${pageFrom}`)}
        className="text-teal-400 hover:underline mb-6"
      >
        ← Back to Page {pageFrom}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-400 mb-2">{product.category}</p>
          <p className="text-lg text-teal-300 font-semibold mb-4">
            ${product.price}
          </p>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetail;
