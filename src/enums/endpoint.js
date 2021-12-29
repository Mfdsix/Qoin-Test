const API_KEY = "2fccde01a371b106b09a241d6d1d5b49";

const ENDPOINTS = {
  get_genres:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY,
  get_movies: "https://api.themoviedb.org/3/movie/upcoming?api_key=" + API_KEY,
  get_movie: "https://api.themoviedb.org/3/movie/MOVIEID?api_key=" + API_KEY,
};

export default ENDPOINTS;
