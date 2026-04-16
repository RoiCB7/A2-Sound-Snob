import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../services/api';

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArtists() {
      try {
        const data = await getArtists();
        setArtists(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load artists');
        setLoading(false);
      }
    }

    loadArtists();
  }, []);

  if (loading) return <p>Loading artists...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Artists</h2>
      <p>Choose Your Fighter.</p>

      <div className="grid">
        {artists.map((artist) => (
          <Link
            key={artist.artist_id}
            to={`/artists/${artist.artist_id}`}
            className="card"
          >
            <img
              src={artist.artist_image_url}
              alt={artist.artist_name}
            />
            <h3>{artist.artist_name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}