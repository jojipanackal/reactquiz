import React, { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function AdminPage() {
  const { addQuestion } = useQuiz();

  const [activeSection, setActiveSection] = useState(null);
  const [questionData, setQuestionData] = useState({
    question: "",
    choices: ["", "", "", ""],
    correctOption: 0,
    points: 10,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChoiceChange = (index, value) => {
    setQuestionData((prevData) => ({
      ...prevData,
      choices: prevData.choices.map((choice, i) =>
        i === index ? value : choice
      ),
    }));
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    try {
      addQuestion(questionData);
      alert("Question created successfully");
      setActiveSection(null);
      setQuestionData({
        question: "",
        choices: ["", "", "", ""],
        correctOption: 0,
        points: 10,
      });
    } catch (error) {
      console.log("Error creating question: " + error.message);
    }
  };

  return (
    <main className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>
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
            <form onSubmit={handleCreateQuestion}>
              <div className="form-group">
                <label htmlFor="question">Question:</label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={questionData.question}
                  onChange={handleInputChange}
                  required
                  className="question-input"
                />
              </div>
              {questionData.choices.map((choice, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`choice${index}`}>Choice {index + 1}:</label>
                  <input
                    type="text"
                    id={`choice${index}`}
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    required
                    className="question-input"
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="correctOption">Correct Option (0-3):</label>
                <input
                  type="number"
                  id="correctOption"
                  name="correctOption"
                  min="0"
                  max="3"
                  value={questionData.correctOption}
                  onChange={handleInputChange}
                  required
                  className="question-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="points">Points:</label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  min="1"
                  value={questionData.points}
                  onChange={handleInputChange}
                  required
                  className="question-input"
                />
              </div>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPage;
