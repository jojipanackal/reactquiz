import { useQuiz } from '../contexts/QuizContext';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';

function QuizContent() {
  const { status } = useQuiz();

  return (
    <main className="main">
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen />}
      {status === 'active' && (
        <>
          <Progress />
          <Question />
          <Footer>
            <NextButton />
          </Footer>
        </>
      )}
      {status === 'finished' && <FinishScreen />}
    </main>
  );
}

export default QuizContent;
