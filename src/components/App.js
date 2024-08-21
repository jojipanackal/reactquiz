import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import QuizContent from "./QuizContent";
import Signup from "./Signup";
import { useQuiz } from "../contexts/QuizContext";
import AdminPage from "./AdminPage";

export default function App() {
  const { isLoggedIn, username } = useQuiz();
  console.log(username);

  return (
    <BrowserRouter basename="/reactquiz">
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/quiz" /> : <Login />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/login" /> : <Signup />}
          />
          <Route
            path="/quiz"
            element={isLoggedIn ? <QuizContent /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
