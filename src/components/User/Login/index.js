import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser, resetLoginState } from "slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const PageContainer = styled.div`
  padding-top: 10px 40px 10px 40px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  padding-bottom: 10px;

  @media only screen and (max-width: 699px) {
    margin-top: 15px;
    text-align: center;
  }

  @media only screen and (min-width: 700px) {
    margin-top: 20px;
    padding-left: 100px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.div`
  padding-bottom: 10px;

  @media only screen and (max-width: 699px) {
    font-size: 25px;
    margin-top: 20px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 30px;
  }
`;

const FormContainer = styled.div`
  justify-content: flex-start;
  width: 14%;

  @media only screen and (max-width: 699px) {
    margin-top: 20px;
    width: 70%;
  }

  @media only screen and (min-width: 700px) {
    width: 250px;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 5px;
    border: 2px solid #e3e3e3;
    :focus {
      outline: 2px solid #9da631;
      border: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const SubmitButton = styled.div`
  background-color: #9da631;
  border: none;
  border-radius: 2px;
  padding: 8px 10px 8px 10px;
  color: white;
  font-size: inherit;
  cursor: pointer;
  :focus {
    outline: none;
    border: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9da631;
  font-weight: bold;
`;

const ErrorSection = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const userState = useSelector((state) => state.user);
  const { error } = userState.loginState;
  const { loggedInUser } = userState;

  const handleUserInfoChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(loginUser(userInfo));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      // redirect
      navigate("/habits");
    }
  }, [loggedInUser, navigate]);

  const handleResetState = () => {
    dispatch(resetLoginState());
  };

  return (
    <PageContainer>
      <PageTitle>Habit Tracker</PageTitle>
      <LoginContainer>
        <FormTitle>Login</FormTitle>
        {error && <ErrorSection>{error.message}</ErrorSection>}
        <FormContainer>
          <InputSection>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              maxLength="100"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              maxLength="128"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Sign-in
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Don't have an account?{" "}
          <StyledLink to="/register" onClick={handleResetState}>
            Register Here
          </StyledLink>
        </div>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;
