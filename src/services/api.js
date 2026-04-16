const API_BASE_URL = 'https://song-data-api.onrender.com/api';

async function fetchJSON(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return await response.json();
}

export async function getArtists() {
  return await fetchJSON('/artists');
}

export async function getGenres() {
  return await fetchJSON('/genres');
}

export async function getSongs() {
  return await fetchJSON('/songs');
}

export async function getTypes() {
  return await fetchJSON('/types');
}