import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AboutPage from './AboutPage';

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <h1>Sound Snob!</h1>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/artists">Artists</NavLink>
            <NavLink to="/genres">Genres</NavLink>
            <NavLink to="/songs">Songs</NavLink>
            <NavLink to="/playlists">Playlists</NavLink>
            <NavLink to="/login">Login</NavLink>
            <button type="button"
              className="nav-button"
              onClick={() => setIsAboutOpen(true)}
            > About 
            </button>
          </nav>
        </div>
      </header>
      <AboutPage
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </>
  );
}