import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ReportPage from "./ReportPage";
import "./QuizStyle.css";
import { quizData } from "./QuizData";
import axios from "axios";

function Quiz() {
  //   const [quizData, setQuizData] = useState();
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState(
    Array(quizData.results.length).fill(false)
  );
  const [attemptedQuestions, setAttemptedQuestions] = useState(
    Array(quizData.results.length).fill(false)
  );
  const initialTime = 30 * 60; // 30 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [userAnswer, setUserAnswer] = useState(
    Array(quizData.results.length).fill(0)
  );

  const jumpQuestion = (idx) => {
    updateScore();
    setCurrentQuestion(idx);
    setClickedOption(0);

    const updatedVisitedQuestions = [...visitedQuestions];
    updatedVisitedQuestions[idx] = true;
    setVisitedQuestions(updatedVisitedQuestions);
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < quizData.results.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }

    const updatedVisitedQuestions = [...visitedQuestions];
    updatedVisitedQuestions[currentQuestion + 1] = true;
    setVisitedQuestions(updatedVisitedQuestions);
  };

  useEffect(() => {
    if (isTimeUp) {
      changeQuestion();
    }
  }, [isTimeUp]);

  const updateScore = () => {
    if (clickedOption != 0) {
      const updatedAttemptedQuestions = [...attemptedQuestions];
      updatedAttemptedQuestions[currentQuestion] = true;
      setAttemptedQuestions(updatedAttemptedQuestions);
    }
    //condition for: if user has selected correct option
    if (clickedOption === 4) {
      setScore(score + 1);
    }

    //if clickedOption is 0 that means the user has not attempted the question.
    //else user has attempted the question
    const updatedUserAnswer = [...userAnswer];
    updatedUserAnswer[currentQuestion] = clickedOption;
    setUserAnswer(updatedUserAnswer);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrement the time every second
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          setIsTimeUp(true);
          return 0;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isTimeUp]);

  // Format seconds into minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);

    const newAttemptedQuestions = Array(quizData.results.length).fill(false);
    setAttemptedQuestions(newAttemptedQuestions);
    const newVisitedQuestions = Array(quizData.results.length).fill(false);
    setVisitedQuestions(newVisitedQuestions);
    setTime(initialTime);
    setIsTimeUp(false);
  };

//  API Limitation:-
// - Due to issues with the provided API, which responded with a status code 429 (Too Many Requests), indicating that the rate limit imposed by the API server was exceeded.
// - To overcome this limitation, the application stores the quiz results locally in the `QuizData.js` file present inside the src folder of Quiz-App.
// - The stored data in `QuizData.js` maintains the structure of the API, ensuring compatibility with the original intended functionality.

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://opentdb.com/api.php?amount=15`
  //         );
  //         setQuizData(response.data.results);
  //         setError(null);
  //       } catch (err) {
  //         setQuizData(null);
  //       }
  //     };
  //     getData();
  //   }, []);

  //   console.log("QuizData is: " + JSON.stringify(quizData, undefined, "\t"));

  return (
    <>
      <Container>
        {isTimeUp || showResult ? (
          <></>
        ) : (
          <AllQuestionNumber>
            <Box>Ques.</Box>
            {quizData.results.map((val, idx) => {
              return (
                <Box
                  style={{
                    backgroundColor: attemptedQuestions[idx]
                      ? "#FFA500"
                      : visitedQuestions[idx] || idx === 0
                      ? "#8E8E8E"
                      : "",
                  }}
                  key={idx}
                  onClick={() => jumpQuestion(idx)}
                >
                  {idx + 1}.
                </Box>
              );
            })}
          </AllQuestionNumber>
        )}
        <Timer>
          {isTimeUp || showResult ? (
            <></>
          ) : (
            <p>Countdown Timer: {formatTime(time)}</p>
          )}
        </Timer>
        <Text1>Quiz APP</Text1>
        <Parent>
          {isTimeUp || showResult ? (
            <ReportPage
              quizData={quizData}
              userAnswer={userAnswer}
              score={score}
              totalScore={quizData.results.length}
              tryAgain={resetAll}
            />
          ) : (
            <>
              <Question>
                <div>
                  {currentQuestion + 1}.{" "}
                  {quizData.results[currentQuestion].question}
                </div>
              </Question>
              <Options>
                {quizData.results[currentQuestion].incorrect_answers.map(
                  (option, idx) => {
                    return (
                      <button
                        className={`option-btn ${
                          clickedOption == idx + 1 ? "checked" : null
                        }`}
                        key={idx}
                        onClick={() => {
                          setClickedOption(idx + 1);
                        }}
                      >
                        {option}
                      </button>
                    );
                  }
                )}

                <button
                  className={`option-btn ${
                    clickedOption === 4 ? "checked" : null
                  }`}
                  // 4 will represent the correct option has been clicked by the user
                  onClick={() => setClickedOption(4)}
                >
                  {quizData.results[currentQuestion].correct_answer}
                </button>
              </Options>
              <Button onClick={changeQuestion}>Next</Button>
            </>
          )}
        </Parent>

        {isTimeUp || showResult ? (
          <></>
        ) : (
          <Bottom>
            <StyledSpan>
              <Color1></Color1> Visited &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Color2></Color2> Attempted
            </StyledSpan>
          </Bottom>
        )}
      </Container>
    </>
  );
}

export default Quiz;

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
`;
const AllQuestionNumber = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #0e6656;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0e6656;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  @media only screen and (max-width: 900px) {
    flex-direction: row;
    height: 11vh;
    width: 100vw;
    overflow-y: hidden;
    overflow-x: auto;
    border-right: 1px solid #0e6656;
    position: fixed;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #0e6656;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: white;
    }
  }
`;
const Box = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 40px;
  cursor: pointer;
  background-color: white;
  color: black;
  font-size: 18px;
  font-weight: bold;
  line-height: 30px;
  border: 1px solid #0e6656;
  @media only screen and (max-width: 900px) {
    min-width: 70px;
    min-height: 7vh;
    line-height: 52px;
  }
`;
const Timer = styled.div`
  color: white;
  width: 50%;
  font-size: 23px;
  font-weight: bold;
  margin: 10px auto 0 auto;
  text-align: center;
  @media only screen and (max-width: 900px) {
    margin-top: 10%;
  }
  @media only screen and (max-width: 700px) {
    margin-top: 24%;
  }
`;
const Text1 = styled.div`
  color: white;
  width: 50%;
  font-size: 30px;
  font-weight: bold;
  margin: 10px auto;
  text-align: center;
  text-transform: uppercase;
`;
const Parent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 35px auto 0 auto;
  flex-direction: column;
  min-height: 400px;
  width: 60%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 2px 2px 10px 1px #333;
  overflow: hidden;
  padding: 10px;
  /* position: relative; */

  transition: opacity 0.9s ease-in-out;

  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;
const Question = styled.div`
  margin: 8px;
  color: black;
  box-shadow: 0px 0px 10px 1px #a2a3a3;
  border-radius: 5px;
  padding: 5px;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: "Times New Roman", Times, serif;
  min-width: 100%;
  min-height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px 4px;
  width: 100%;
  padding: 10px;
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  background-color: #0e6656;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
  border-radius: 8px;
  border: 1px solid;
  &:hover {
    opacity: 0.9;
    background-color: #0e6656;
    color: white;
    box-shadow: 0px 0px 8px #13846f;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px auto;
  flex-direction: column;
  min-height: 50px;
  width: 61.3%;
  color: black;
  background-color: white;
  border-radius: 15px;
  box-shadow: 2px 2px 10px 1px #333;
  overflow: hidden;
  /* padding: 5px; */
  position: relative;
  font-weight: bold;
  font-size: 20px;
  @media only screen and (max-width: 900px) {
    width: 91%;
  }
`;
const StyledSpan = styled.span`
  line-height: 25px;
`;
const Color1 = styled.div`
  width: 20px;
  height: 20px;
  background-color: #8e8e8e;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
`;
const Color2 = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffa500;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
`;
