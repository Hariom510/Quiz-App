import React from "react";
import styled from "styled-components";

function ReportPage(props) {
  return (
    <Parent>
      <h4>Report:</h4>
      Your Score: {props.score}
      <br />
      Total Score: {props.totalScore} <br /> <br />
      {props.quizData.results.map((val, idx) => {
        return (
          <>
            <Question>
              <div>
                <span style={{fontWeight:"bold"}}>{idx + 1}.</span> {val.question}
              </div>{" "}
              <br />
              <p style={{ display: "inline-block" }}>
                Your Answer:{" "}
                {props.userAnswer[idx] === 0 ? (
                  <p style={{ color: "#808080", display: "inline-block" }}>
                    Not Attempted
                  </p>
                ) : props.userAnswer[idx] === 4 ? (
                  <p style={{ color: "#008000", display: "inline-block" }}>
                    {val.correct_answer}
                  </p>
                ) : (
                  <p style={{ color: "#e81515", display: "inline-block" }}>
                    {val.incorrect_answers[props.userAnswer[idx] - 1]}
                  </p>
                )}
              </p>
              <p style={{ display: "inline-block" }}>
                Correct Answer:{" "}
                <p style={{ display: "inline-block" }}>{val.correct_answer}</p>
              </p>
            </Question>
          </>
        );
      })}
      <Button onClick={props.tryAgain}>Try Again</Button>
    </Parent>
  );
}

export default ReportPage;

const Parent = styled.div`
  text-align: center;
  margin: 10px auto 40px auto;
  font-size: 30px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 0px;
  }
`;
const Question = styled.div`
  margin: 8px;
  color: black;
  box-shadow: 0px 0px 10px 1px #a2a3a3;
  border-radius: 5px;
  padding: 5px;
  font-family: "Times New Roman", Times, serif;
  min-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 24px;
  }
  p {
    font-size: 22px;
    margin-bottom: 4px;
    padding: 0;
    margin-top: 0px;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  margin-top: 30px;
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
