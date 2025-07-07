// src/tmdb.js
const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN    = import.meta.env.VITE_APP_TMDB_TOKEN;

// Internal wrapper that sets the Bearer header
async function tmdbFetch(path, params = {}) {
  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  return res.json();
}

// Public functions:
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
