import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtists, getSongs } from '../services/api';
import SongList from '../components/SongList';

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function ArtistDetailsPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArtistData() {
      try {
        const artistsData = await getArtists();
        const songsData = await getSongs();

        const foundArtist = artistsData.find(
          (artist) => String(artist.artist_id) === String(id)
        );

        const filteredSongs = songsData.filter(
          (song) => String(song.artist_id) === String(id)
        );

        setArtist(foundArtist);
        setSongs(filteredSongs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load artist details');
        setLoading(false);
      }
    }

    loadArtistData();
  }, [id]);

  if (loading) return <p>Loading artist details...</p>;
  if (error) return <p>{error}</p>;
  if (!artist) return <p>Artist not found.</p>;

  return (
    <section>
      <h2>{artist.artist_name}</h2>

      {artist.artist_image_url && (
        <img
          src={artist.artist_image_url}
          alt={artist.artist_name}
          className="detail-image"
        />
      )}

      <p>
        <strong>Spotify Description:</strong>{' '}
        <a href={artist.spotify_url} target="_blank" rel="noreferrer">
          
        </a>
      </p>

      <p>{artist.spotify_desc}</p>

      <h3>Songs by this Artist</h3>
      <SongList songs={songs} />
    </section>
  );
}