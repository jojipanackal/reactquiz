import React, { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function AdminPage() {
  const { addQuestion } = useQuiz();

  const [activeSection, setActiveSection] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const placeholder_json = {
    question: "How does data flow naturally in React apps?",
    choices: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  };

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
              placeholder={JSON.stringify(placeholder_json)}
              rows="10"
            />
            <button className="btn btn-submit" onClick={handleCreateQuestion}>
              Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPage;
