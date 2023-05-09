// OMDB API key = 4dbde16b
// Example:
// 'http://www.omdbapi.com/?i=tt3896198&apikey=4dbde16b'

import { renderListing } from "./util.js";

const localStorage = window.localStorage;
const searchList = document.getElementById('search-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let currentMovie = {};

// Set up local storage if it does not exist
if (!localStorage.getItem('movies')) {
  localStorage.setItem('movies', JSON.stringify([]));
}

// Event Listeners

// Search for a movie title
searchBtn && searchBtn.addEventListener('click', searchListing);

// If an add or remove button is clicked, add or remove the
// corresponding button's movie to the movies list.
searchList.addEventListener('click', (event) => {
  let movieList = JSON.parse(localStorage.getItem('movies'));
  console.log(1, movieList);
  console.log(2, currentMovie);

  let found = movieList.find(movie => movie.imdbID === event.target.dataset.movie);
  console.log(3, found);

  if (event.target.dataset.movie) {

    if (!found) {
      movieList.push(currentMovie);
      localStorage.setItem('movies', JSON.stringify(movieList));
      searchListing();
    } else {
      const newMovieList = movieList.filter(movie => movie.imdbID !== event.target.dataset.movie);
      console.log(newMovieList);
      localStorage.setItem('movies', JSON.stringify(newMovieList));
      searchListing();
    }
  }
});

const noSearchInput = `
  <div id="non-list-content">
    <img id="blank-icon" src="./images/blank-icon.png"/>
    <span id="explore">Start Exploring</span>
  </div>
`
const noSearchResults = `
  <div id="non-list-content">
    <span id="no-results">
      Unable to find what you are looking for. Please try another search.
    </span>
  </div>
`

// Search for and render the returned data.
function searchListing() {
  fetch(`https://www.omdbapi.com/?t=${searchInput.value}&plot=fulle&apikey=4dbde16b`,
    {
      "Content-Type": "application/json"
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.imdbID) {
        // console.log(1, data)
        currentMovie = data;
        // console.log(2, currentMovie);
        let movies = JSON.parse(localStorage.getItem('movies'));
        // console.log(3, movies)
        let exists = movies.length ? movies.find(movie => movie.imdbID === data.imdbID) : false;
        // console.log(4, exists);

        searchList.innerHTML = renderListing(data, exists);
      } else {
        searchList.innerHTML = noSearchResults;
      }
    }
  )
}

// Set default
searchList.innerHTML = noSearchInput;

