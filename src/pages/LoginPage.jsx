/**
 * 
 * Limitations: Need to refresh the page to logout. Add in a persistent logout button later.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      navigate('/'); // return to homepage
    }
  }

  if (isLoggedIn) {
    return (
      <section>
        <h2>Login</h2>
        <p>You are tuned in.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Login</h2>
      <p>This is a simulated login and has no actual functionality.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="primary-button">
          Login
        </button>
      </form>
    </section>
  );
}