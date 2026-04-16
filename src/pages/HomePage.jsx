/**
 * 
 * Limitations: Wanted to link each of the sample songs to their song page but wasn't able to get it working properly.
 */
import { useEffect, useState } from 'react';
import { getArtists, getGenres, getSongs } from '../services/api';

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function HomePage() {
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHomeData() {
      try {
        const artistsData = await getArtists();
        const genresData = await getGenres();
        const songsData = await getSongs();

        setArtists(artistsData);
        setGenres(genresData);
        setSongs(songsData);
        setLoading(false);

      }
      catch (error) {
        console.error(error);
        setError(`Failed to load application data: ${error.message}`);
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  if (loading) {
    return (
      <section>
        <h2>Home</h2>
        <p>Loading data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Home</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>You've Arrived</h2>
      <p>Now Seek Sound.</p>

      <div className="home-grid">
        <div className="info-card">
          <h3>Total Artists Catalouged</h3>
          <p>{artists.length}</p>
        </div>

        <div className="info-card">
          <h3>Total Genres Catalouged</h3>
          <p>{genres.length}</p>
        </div>

        <div className="info-card">
          <h3>Total Songs Catalouged</h3>
          <p>{songs.length}</p>
        </div>
      </div>

      <div className="info-card">
        <h3> Some Sample Songs</h3>
        <ul>
          {songs.slice(0, 5).map((song) => (
            <li key={song.song_id}>
              {song.title} ({song.year})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}