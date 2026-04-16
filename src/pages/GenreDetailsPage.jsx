import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGenres, getSongs } from '../services/api';
import SongList from '../components/SongList';

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function GenreDetailsPage() {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadGenreData() {
      try {
        const genresData = await getGenres();
        const songsData = await getSongs();

        const foundGenre = genresData.find(
          (genre) => String(genre.genre_id) === String(id)
        );

        const filteredSongs = songsData.filter(
          (song) => String(song.genre_id) === String(id)
        );

        setGenre(foundGenre);
        setSongs(filteredSongs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load genre details');
        setLoading(false);
      }
    }

    loadGenreData();
  }, [id]);

  if (loading) return <p>Loading Genre details...</p>;
  if (error) return <p>{error}</p>;
  if (!genre) return <p>Genre not found.</p>;

  return (
    <section>
      <h2>{genre.genre_name}</h2>

      <h3>Songs in this Genre</h3>
      <SongList songs={songs} />
    </section>
  );
}