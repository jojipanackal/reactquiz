import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  username: "",
  isLoggedIn: false,
  message: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.data,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        isLoggedIn: true,
        highscore: state.highscore,
        username: state.username,
      };
    case "setMessage":
      return { ...state, message: action.payload };
    case "handleLogin":
      return {
        ...state,
        username: action.payload.username,
        highscore: action.payload.highscore,
        isLoggedIn: true,
      };
    case "logout":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      isLoggedIn,
      message,
      username,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("https://quizback-joji.vercel.app/api/v1/quiz/readQuestions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const signup = async (username, password) => {
    try {
      const response = await fetch(
        "https://quizback-joji.vercel.app/api/v1/quiz/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, highscore: 0 }),
        }
      );

      const message = await response.json();
      if (!response.ok) {
        dispatch({ type: "setMessage", payload: message.msg });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://quizback-joji.vercel.app/api/v1/quiz/readSpecificUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: "setMessage", payload: data.msg });
      } else {
        dispatch({ type: "handleLogin", payload: data.data.at(0) });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const addQuestion = async (parsedData) => {
    try {
      await fetch(
        "https://quizback-joji.vercel.app/api/v1/quiz/createQuestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );
    } catch (error) {
      console.error("Error during creating question:", error.message);
    }
  };

  const readQuestions = async () => {
    fetch("https://quizback-joji.vercel.app/api/v1/quiz/readQuestions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  };

  const logout = async (username, highscore) => {
    try {
      const response = await fetch(
        "https://quizback-joji.vercel.app/api/v1/quiz/updateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, highscore }),
        }
      );

      const data = await response.json();
      if (response.ok || response.status === 404) {
        dispatch({ type: "logout" });
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        numQuestions,
        maxPossiblePoints,
        isLoggedIn,
        message,
        username,
        login,
        logout,
        dispatch,
        signup,
        addQuestion,
        readQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
