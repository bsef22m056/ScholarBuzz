import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
const Key = "4f449ce2";
export default function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);
  function handleIncrement() {
    setCount((count) => count + 1);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${Key}&s=batman}`
      );
      const data = await response.json();
      setMovies(data.Search);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        <h1>Counter: {count}</h1>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </>
  );
}
