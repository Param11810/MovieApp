// src/tmdb.js
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function tmdbFetch(path, params = {}) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("api_key", API_KEY); // 👈 add key to query string
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  return res.json();
}

export function fetchPopular(page = 1) {
  return tmdbFetch("/movie/popular", { language: "en-US", page });
}

export function searchMulti(query, page = 1) {
  return tmdbFetch("/search/multi", {
    language: "en-US",
    query,
    page,
    include_adult: false
  });
}

export function getDetails(type, id) {
  return tmdbFetch(`/${type}/${id}`, {
    language: "en-US",
    append_to_response: "videos,images"
  });
}
