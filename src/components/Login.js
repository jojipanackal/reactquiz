import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, message } = useQuiz();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
    navigate("/quiz");
  }

  return (
    <main className="main">
      <div className="login-container">
        <h2>Login</h2>
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
          {message ? <p className="message">{message}</p> : <></>}
          <button type="submit" className="btn btn-login">
            Log In
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/signup ">Register Here</Link>
        </p>
        <p className="register-link">
          Create Question? <Link to="/admin ">Go to Admin Page</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
