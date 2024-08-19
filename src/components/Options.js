import { useQuiz } from '../contexts/QuizContext';

function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.choices.map((option, index) => (
        <button
          className={`btn btn-option  ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
