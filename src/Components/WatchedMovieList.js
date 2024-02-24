import WatchedMovie from "./WatchedMovie";
function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list list-movie">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
export default WatchedMovieList;
