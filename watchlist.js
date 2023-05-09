import { renderListing } from "./util.js";
const localStorage = window.localStorage;
const watchList = document.getElementById('watch-list')

// corresponding button's movie to the movies list.
watchList.addEventListener('click', (event) => {
  let movieList = JSON.parse(localStorage.getItem('movies'));
  let found = movieList.find(movie => movie.imdbID === event.target.dataset.movie);

  if (event.target.dataset.movie) {
    if (!found) {
      movieList.push(currentMovie);
      localStorage.setItem('movies', JSON.stringify(movieList));
      renderMovieList(movieList);
    } else {
      const newMovieList = movieList.filter(movie => movie.imdbID !== event.target.dataset.movie);
      console.log(newMovieList);
      localStorage.setItem('movies', JSON.stringify(newMovieList));
      renderMovieList(newMovieList);
    }
  }
});

if (!JSON.parse(localStorage.getItem('movies')).length) {
  watchList.innerHTML = `
    <div id="non-list-content">
      <span id="empty-list">Your watchlist is looking a little empty...</span>
      <a id="add-movies-container" href="./index.html">
        <img src="./images/add-icon.png"/>
        <span>Let's add some movies!</span></div>
      </a>
    </div>
  `
} else {
  let movies = JSON.parse(localStorage.getItem('movies'));
renderMovieList(movies);
}

function renderMovieList(movieList) {
  watchList.innerHTML = movieList.map(movie => {
    return renderListing(movie, true);
  }).join('')
}