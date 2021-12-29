const API_KEY = "2fccde01a371b106b09a241d6d1d5b49";

const ENDPOINTS = {
  get_genres:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY,
  get_movies: "https://api.themoviedb.org/3/movie/upcoming?api_key=" + API_KEY,
  get_movie: (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=` + API_KEY;
  },
  get_poster: "http://image.tmdb.org/t/p/w500/",
};

export default ENDPOINTS;
