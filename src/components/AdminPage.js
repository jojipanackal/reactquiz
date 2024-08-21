import React, { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function AdminPage() {
  const { addQuestion, questions } = useQuiz();

  const [activeSection, setActiveSection] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  // const [users, setUsers] = useState({});

  const handleCreateQuestion = () => {
    try {
      const parsedData = JSON.parse(questionInput);
      addQuestion(parsedData);
      alert("question created successfully");
      setActiveSection(null);
    } catch (error) {
      console.log("Invalid JSON Format" + error.message);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-buttons">
        <button
          className={`btn btn-admin ${
            activeSection === "createQuestion" ? "active" : ""
          }`}
          onClick={() => setActiveSection("createQuestion")}
        >
          Create Question
        </button>
      </div>

      <div className="admin-content">
        {activeSection === "createQuestion" && (
          <div className="section">
            <h3>Create Question</h3>
            <textarea
              className="question-input"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Enter question JSON"
              rows="10"
            />
            <button className="btn btn-submit" onClick={handleCreateQuestion}>
              Submit
            </button>
          </div>
        )}
        {activeSection === "deleteQuestion" && (
          <div className="section">
            <h3>Delete Question</h3>
            <input
              type="text"
              className="id-input"
              value={deleteQuestionId}
              onChange={(e) => setDeleteQuestionId(e.target.value)}
              placeholder="Enter question ID"
            />
            <button className="btn btn-delete">Delete</button>
          </div>
        )}
        {activeSection === "deleteUser" && (
          <div className="section">
            <h3>Delete User</h3>
            <input
              type="text"
              className="id-input"
              value={deleteUserId}
              onChange={(e) => setDeleteUserId(e.target.value)}
              placeholder="Enter user ID"
            />
            <button className="btn btn-delete">Delete</button>
          </div>
        )}
        {activeSection === "readUsers" && (
          <div className="section">
            <h3>Users</h3>
            <p>User list will be displayed here</p>
          </div>
        )}
        {activeSection === "readQuestions" && (
          <div className="section">
            <h3>Questions</h3>
            <p>{questions}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPage;
