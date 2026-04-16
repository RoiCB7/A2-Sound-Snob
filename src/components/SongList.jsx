import { Link } from 'react-router-dom';

export default function SongList({ songs }) {
  if (!songs || songs.length === 0) {
    return <p>No songs found.</p>;
  }

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div key={song.song_id} className="song-card">
          <h3>{song.title}</h3>
          <p><strong>Year:</strong> {song.year}</p>
          <p><strong>Popularity:</strong> {song.popularity}</p>
          <Link to={`/songs/${song.song_id}`}>View Song Details</Link>
        </div>
      ))}
    </div>
  );
}