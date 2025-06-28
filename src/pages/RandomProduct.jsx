import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function RandomProduct() {
  const [data, setData] = useState(null);
  const getRandomProduct = async () => {
    try {
      const data = await axiosInstance.get(`/randomproducts/product/random`);
      setData(data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRandomProduct();
  }, []);

  console.log(data);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#202020]">
      <div className="max-w-[400px] w-full rounded-[10px] bg-white overflow-hidden">
        {data && (
          <>
            <div className="h-[150px] w-full overflow-hidden">
              <img
                src={data.images?.[0]}
                className="h-full w-full  object-cover"
              />
            </div>
            <div className="p-5 text-sm space-y-1 font-medium">
              <p className="badgeStyle mr-2">{data.brand}</p>
              <p className="badgeStyle">{data.category}</p>
              <p>Title: {data.title}</p>
              <p>Description: {data.description}</p>
              <button
                onClick={getRandomProduct}
                className="bg-black rounded-[100px] px-5 py-2 text-white cursor-pointer"
              >
                Fetch New User
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RandomProduct;
