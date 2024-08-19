// Signup.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useQuiz();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signup(username, password);
    navigate('/quiz');
  }

  return (
    <div className="app">
      <main className="main">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-login">
              Sign Up
            </button>
          </form>
          <p className="register-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
