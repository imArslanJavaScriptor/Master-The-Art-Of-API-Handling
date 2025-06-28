import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Test() {
  const [genre, setGenre] = useState("science");
  const [limit, setLimit] = useState(5);
  const [jokes, setJokes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [debouncedGenre, setDebouncedGenre] = useState(genre);
  const [debouncedLimit, setDebouncedLimit] = useState(limit);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedGenre(genre);
      setDebouncedLimit(limit);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [genre, limit]);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/randomjokes?limit=${debouncedLimit}&query=${debouncedGenre}`
      );
      setJokes(response.data.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jokes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGenre, debouncedLimit]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#202020] p-4">
      <div className="flex gap-2 bg-[royalBlue] p-4 rounded-[10px]">
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded bg-white/50 border-none outline-0 px-2 backdrop-blur-[10px]"
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="rounded bg-white/50 border-none outline-0 px-2 backdrop-blur-[10px] w-[80px]"
        />
        <button onClick={getData} className="bg-black text-white px-4 py-2 rounded">
          Display
        </button>
      </div>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-[600px] w-full space-y-4 mt-4">
        {jokes && jokes.map((joke) => (
          <div key={joke.id} className="bg-white p-4 rounded shadow text-black">
            <p>{joke.content}</p>
            <p className="text-sm text-gray-500 mt-2">Category: {joke.categories}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
