import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function StartPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    let emailText = e.target.value;
    if (!emailRegex.test(emailText) && emailText !== "") {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <Container>
      <h1>Welcome to Quiz-App</h1> <br /> <br />
      <SInputField>
        <label htmlFor="email">Please enter your email to start quiz:</label>
        <br />
        <input
          required
          type="email"
          placeholder="abc@gmail.com"
          onChange={handleEmail}
          onPaste={handleEmail}
          value={email}
        />

        <br />
        <br />
        {emailError.length > 0 && (
          <span
            style={{
              color: "#ffeb3b",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            {emailError}
          </span>
        )}
      </SInputField>
      <br />
      <CenteredLink
        to={email.length > 0 ? (emailError.length > 0 ? "/" : "/quiz") : "/"}
      >
        <Button>Start Quiz</Button>
      </CenteredLink>
    </Container>
  );
}

export default StartPage;

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const SInputField = styled.div`
  margin: 4px 0px;
  width: 100%;
  label {
    font-size: 18px;
    font-weight: 600;
  }

  input {
    width: 70%;
    font-size: 20px;
    border-radius: 8px;
    border: 2px solid #777575;
    outline: none;
    padding: 8px;
    margin: 4px 0px;
    
  }
`;
const CenteredLink = styled(Link)`
  min-width: 160px;
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 150px;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  background-color: #0e6656;
  color: white;
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
