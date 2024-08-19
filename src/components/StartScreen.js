import { useQuiz } from '../contexts/QuizContext';

function StartScreen() {
  const { numQuestions, dispatch, username } = useQuiz();

  return (
    <div className="start">
      <h2>Hello {username}</h2>
      <h3>Here are {numQuestions} questions on React</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
