import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { Loader } from "lucide-react";

function Home() {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadProducts = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetchProducts(currentPage);
      setProducts(res.data.data.data);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  console.log("Products Data: ", products);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Products (Page {page})</h1>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Loader className="animate-spin" />
        </div>
      ) : (
        products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} currentPage={page} />
            ))}
          </div>
        )
      )}

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className="px-4 py-2 bg-teal-600 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
