

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

import { getSongs, getArtists, getGenres } from '../services/api';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * UseEffect Hook code is referenced from https://blog.logrocket.com/useeffect-react-hook-complete-guide/
 * under the section 'How to use useEffect for asynchronous tasks?'
 */

export default function SongDetailsPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    async function loadSongDetails() {
      try {
        const songsData = await getSongs();
        const artistsData = await getArtists();
        const genresData = await getGenres();

        const foundSong = songsData.find(
          (song) => String(song.song_id) === String(id)
        );

        if (!foundSong) {
          setError('Song not found.');
          setLoading(false);
          return;
        }

        const foundArtist = artistsData.find(
          (artist) =>
            String(artist.artist_id) === String(foundSong.artist_id)
        );

        const foundGenre = genresData.find(
          (genre) =>
            String(genre.genre_id) === String(foundSong.genre_id)
        );

        setSong(foundSong);
        setArtist(foundArtist);
        setGenre(foundGenre);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load song details');
        setLoading(false);
      }
    }

    loadSongDetails();
  }, [id]);

  if (loading) return <p>Loading song details...</p>;
  if (error) return <p>{error}</p>;
  if (!song) return <p>Song not found.</p>;

  const radarData = {
    labels: [
      'Energy',
      'Danceability',
      'Liveness',
      'Valence',
      'Acousticness',
      'Speechiness'
    ],
    datasets: [
      {
        label: song.title,
        data: [
          Number(song.energy),
          Number(song.danceability),
          Number(song.liveness),
          Number(song.valence),
          Number(song.acousticness),
          Number(song.speechiness)
        ],
        backgroundColor: 'rgba(212, 175, 55, 0.18)',
        borderColor: 'rgba(212, 175, 55, 1)',
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: 'rgba(245, 245, 220, 1)',
        pointHoverBackgroundColor: 'rgba(245, 245, 220, 1)',
        pointHoverBorderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 2
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#f5f5dc',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: '#071a12',
        titleColor: '#d4af37',
        bodyColor: '#f5f5dc',
        borderColor: '#b8962e',
        borderWidth: 1
      }
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#f5f5dc',
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(212, 175, 55, 0.22)'
        },
        angleLines: {
          color: 'rgba(212, 175, 55, 0.22)'
        },
        pointLabels: {
          color: '#d4af37',
          font: {
            size: 13
          }
        }
      }
    }
  };

  return (
    <section>
      <h2>{song.title}</h2>

      {artist && (
        <div className="artist-summary">
          {artist.artist_image_url && (
            <img
              src={artist.artist_image_url}
              alt={artist.artist_name}
              className="detail-image"
            />
          )}
          <div>
            <p><strong>Artist:</strong> {artist.artist_name}</p>
            <p>{artist.spotify_desc}</p>
          </div>
        </div>
      )}

      <div className="details-card">
        <p><strong>Year:</strong> {song.year}</p>

        <p>
          <strong>Duration:</strong>{' '}
          {Math.floor(song.duration / 60)}:
          {(song.duration % 60).toString().padStart(2, '0')}
        </p>

        <p>
          <strong>Artist:</strong>{' '}
          {artist ? (
            <Link to={`/artists/${artist.artist_id}`}>
              {artist.artist_name}
            </Link>
          ) : (
            'Unknown'
          )}
        </p>

        <p>
          <strong>Genre:</strong>{' '}
          {genre ? (
            <Link to={`/genres/${genre.genre_id}`}>
              {genre.genre_name}
            </Link>
          ) : (
            'Unknown'
          )}
        </p>

        <p><strong>Popularity:</strong> {song.popularity}</p>
        <p><strong>BPM:</strong> {song.bpm}</p>
      </div>

      <div className="details-card">
        <h3>Song Analytics</h3>
        <div className="chart-container">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

      <button className="primary-button" type="button">
        Add to Playlist
      </button>
    </section>
  );
}