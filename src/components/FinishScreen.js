import { useQuiz } from '../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch, logout, username } =
    useQuiz();
  const navigate = useNavigate();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 0 && percentage < 80) emoji = '🙃';
  if (percentage === 0) emoji = '🤦‍♂️';

  const handleLogout = () => {
    logout(username, highscore); // Call logout function to clear user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <div className="button-container">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: 'restart' })}>
          Restart quiz
        </button>
        <button className="btn btn-ui" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
