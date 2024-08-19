import React, { useState } from 'react';
import { useQuiz } from '../contexts/QuizContext'; // Adjust the import path as needed

function CreateQuestionPopup({ isOpen, onClose }) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const { addQuestion } = useQuiz(); // Ensure this function is available in your context

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);

      // Basic validation
      if (
        typeof parsedData.question === 'string' &&
        Array.isArray(parsedData.choices) &&
        parsedData.choices.every((choice) => typeof choice === 'string') &&
        typeof parsedData.correctOption === 'number' &&
        typeof parsedData.points === 'number'
      ) {
        addQuestion(parsedData);
        onClose(); // Close the popup after submission
        setError(''); // Clear any previous errors
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      setError('Error: Invalid JSON format or data');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="json-input">Enter Question JSON</label>
            <textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows="10"
              placeholder='{
  "question": "Which company invented Netflix?",
  "choices": ["Google", "Apple", "Netflix", "Facebook"],
  "correctOption": 2,
  "points": 10
}'
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-admin">
            Create
          </button>
          <button type="button" className="btn btn-close" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuestionPopup;
