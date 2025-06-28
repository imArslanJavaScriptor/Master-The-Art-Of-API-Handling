import { useNavigate } from "react-router-dom";

function ProductCard({ product, currentPage }) {
  const navigate = useNavigate();
  const image = product.images?.[0] || "https://via.placeholder.com/300";

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/product/${product.id}?page=${currentPage}`)}
    >
      <img
        src={image}
        alt={product.title}
        className="h-40 w-full object-cover rounded mb-4"
      />
      <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
      <p className="text-sm text-gray-400">{product.category}</p>
      <p className="text-teal-400 font-bold mt-2">${product.price}</p>
    </div>
  );
}

export default ProductCard;
