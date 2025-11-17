export default function MovieCard({ movie }) {
  return (
    <div className="max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg bg-white text-gray-900 border border-gray-200">
      <div className="h-80 w-full overflow-hidden">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 space-y-2">
        <h2 className="text-2xl font-bold">{movie.Title}</h2>
        <p className="text-gray-600">Year: {movie.Year}</p>
        <p className="text-gray-500 text-sm uppercase">Type: {movie.Type}</p>
        <a
          href={`https://www.imdb.com/title/${movie.imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-3 text-center bg-yellow-500 text-black py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
}
