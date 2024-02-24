import { useKey } from "../hooks/useKey";
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import Rating from "./StarRating";

const KEY = "8835096c";
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (rating) countRef.current = countRef.current + 1;

      console.log(countRef.current);
    },
    [rating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleRateMovie() {
    const runtimeNoMin = runtime.split(" ")[0];
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtimeNoMin),
      userRating: rating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") onCloseMovie();
  //     }
  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2> {title} </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p> {genre} </p>
              <p>
                <span> ⭐️ </span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Rating
                    maxRating={10}
                    size={22}
                    color="pink"
                    onSetRating={setRating}
                  />
                  {rating && (
                    <button className="btn-add" onClick={handleRateMovie}>
                      Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated the movie {watchedUserRating} <span> 🤩</span>
                </p>
              )}
            </div>
            <p>
              <em> {plot} </em>
            </p>
            <p> Starring: {actors}</p>
            <p> Director: {director} </p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
