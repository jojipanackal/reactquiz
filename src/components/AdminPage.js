import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import CreateQuestionPopup from './CreateQuestionPopUp';

function AdminPage() {
  const navigate = useNavigate();
  const { logout } = useQuiz();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateQuestion = () => {
    setIsPopupOpen(true);
  };

  const handleDeleteQuestion = () => {
    navigate('/admin/delete-question');
  };

  const handleDeleteUser = () => {
    navigate('/admin/delete-user');
  };

  const handleReadUsers = () => {
    navigate('/admin/read-users');
  };

  const handleLogout = () => {
    logout(); // Call logout function to clear user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <main className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-buttons">
        <button className="btn btn-admin" onClick={handleCreateQuestion}>
          Create Question
        </button>
        <button className="btn btn-admin" onClick={handleDeleteQuestion}>
          Delete Question
        </button>
        <button className="btn btn-admin" onClick={handleDeleteUser}>
          Delete User
        </button>
        <button className="btn btn-admin" onClick={handleReadUsers}>
          Read Users
        </button>
        <button className="btn btn-admin btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CreateQuestionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </main>
  );
}

export default AdminPage;
