// Render a movie Listing;
export function renderListing(movie, exists) {
  return `
    <div class="movie">
      <img class="movie-img" src=${movie.Poster} />
      <div class="movie-info">
        <div class="movie-title-container">
          <span class="movie-title">${movie.Title}</span>
          <span class="movie-rating-container">
            <img class="movie-rating-icon" src="./images/star-icon.png" />
            <span class="movie-rating">${movie.imdbRating}</span>
          </span>
        </div>
        <div class="movie-specs">
          <span class="movie-runtime">${movie.Runtime}</span>
          <span class="movie-categories">${movie.Genre}</span>
          <button id="${movie.imdbID}" class="add-remove-btn" data-movie="${movie.imdbID}"><img class="add-remove-icon" src="${exists ? './images/remove-icon.png' : './images/add-icon.png'}" data-movie="${movie.imdbID}" /><span data-movie="${movie.imdbID}">${exists ? 'Remove' : 'Add'}</span></button>
        </div>
        <p class="movie-summary">${movie.Plot}</p>
      </div>
    </div>
  `
}