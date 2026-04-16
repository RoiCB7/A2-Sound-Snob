import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import GenresPage from './pages/GenresPage';
import SongsPage from './pages/SongsPage';
import SongDetailsPage from './pages/SongDetailsPage';
import ArtistDetailsPage from './pages/ArtistDetailsPage';
import GenreDetailsPage from './pages/GenreDetailsPage';
import LoginPage from './pages/LoginPage';
import PlaylistsPage from './pages/PlaylistsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="artists/:id" element={<ArtistDetailsPage />} />
        <Route path="genres" element={<GenresPage />} />
        <Route path="genres/:id" element={<GenreDetailsPage />} />
        <Route path="songs" element={<SongsPage />} />
        <Route path="songs/:id" element={<SongDetailsPage />} />
        <Route path="login" element={ <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn} /> } />
        <Route path="playlists" element={<PlaylistsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}