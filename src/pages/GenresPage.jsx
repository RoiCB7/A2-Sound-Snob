import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/api';

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await getGenres();
        setGenres(data);
        setLoading(false);
        
      } catch (error) {
        console.error(error);
        setError('Failed to load genres');
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  if (loading) return <p>Loading genres...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Music Genres</h2>
      <p>Find Your Vibe.</p>

      <div className="grid">
        {genres.map((genre) => (
          <Link
            key={genre.genre_id}
            to={`/genres/${genre.genre_id}`}
            className="card"
          >
            <h3>{genre.genre_name}</h3>
            <p>{genre.genre_description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}