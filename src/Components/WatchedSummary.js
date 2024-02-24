const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {
  let avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  avgImdbRating = Math.round(avgImdbRating * 100) / 100;
  let avgUserRating = average(watched.map((movie) => movie.userRating));
  avgUserRating = Math.round(avgUserRating * 100) / 100;
  let avgRuntime = average(watched.map((movie) => movie.runtime));
  avgRuntime = Math.round(avgRuntime);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
