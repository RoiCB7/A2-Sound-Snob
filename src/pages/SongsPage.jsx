import { useEffect, useMemo, useState } from 'react';
import { getArtists, getGenres, getSongs } from '../services/api';
import SongList from '../components/SongList';


/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const songsData = await getSongs();
        const artistsData = await getArtists();
        const genresData = await getGenres();

        setSongs(songsData);
        setArtists(artistsData);
        setGenres(genresData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load song data');
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredSongs = useMemo(() => {
    let result = [...songs];

    if (searchTerm.trim() !== '') {
      result = result.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedArtist !== '') {
      result = result.filter(
        (song) => String(song.artist_id) === String(selectedArtist)
      );
    }

    if (selectedGenre !== '') {
      result = result.filter(
        (song) => String(song.genre_id) === String(selectedGenre)
      );
    }

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'year') {
      result.sort((a, b) => Number(a.year) - Number(b.year));
    }

    return result;
  }, [songs, searchTerm, selectedArtist, selectedGenre, sortBy]);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Browse Songs</h2>
      <p>Find Your Beat.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by song title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <option value="">All Artists</option>
          {artists.map((artist) => (
            <option key={artist.artist_id} value={artist.artist_id}>
              {artist.artist_name}
            </option>
          ))}
        </select>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.genre_id} value={genre.genre_id}>
              {genre.genre_name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <p>{filteredSongs.length} song(s) found.</p>

      <SongList songs={filteredSongs} />
    </section>
  );
}