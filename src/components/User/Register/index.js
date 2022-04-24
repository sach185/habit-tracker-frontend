import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerUser, resetRegisterState } from "slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "helper/helper";

const PageContainer = styled.div`
  padding-top: 10px;
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

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.div`
  font-size: 30px;
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
  font-family: inherit;
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
`;

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [valError, setValError] = useState(null);

  const userState = useSelector((state) => state.user);
  const { error } = userState.registerState;
  const { loggedInUser } = userState;

  const handleUserInfoChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const validateInputs = () => {
    const { firstName, lastName, email, password, passwordConfirmation } =
      userInfo;

    if (!firstName && !lastName && !email) {
      setValError("All fields are mandatory");
      return false;
    } else if (!password) {
      setValError("Please enter a password");
      return false;
    } else if (!firstName) {
      setValError("Please enter First name");
      return false;
    } else if (!lastName) {
      setValError("Please enter Last name");
      return false;
    } else if (!email) {
      setValError("Please enter a valid email");
      return false;
    } else if (password !== passwordConfirmation) {
      setValError("Password do not match");
      return false;
    } else if (!validateEmail(email)) {
      setValError("Invalid Email Address");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    validateInputs() && dispatch(registerUser(userInfo));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      // redirect
      navigate("/habits");
    }
  }, [loggedInUser, navigate]);

  const handleResetState = () => {
    dispatch(resetRegisterState());
  };

  return (
    <PageContainer>
      <PageTitle>Habit Tracker</PageTitle>
      <RegisterContainer>
        <FormTitle>Register</FormTitle>
        {(error || valError) && (
          <ErrorSection>{valError || error.message}</ErrorSection>
        )}
        <FormContainer>
          <InputSection>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              maxLength="60"
              onChange={handleUserInfoChange}
              required
            />
          </InputSection>
          <InputSection>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              maxLength="60"
              onChange={handleUserInfoChange}
              required
            />
          </InputSection>
          <InputSection>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              maxLength="100"
              onChange={handleUserInfoChange}
              required
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
              required
            />
          </InputSection>
          <InputSection>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Confirm Password"
              maxLength="128"
              onChange={handleUserInfoChange}
              required
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Register
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Already have an account?{" "}
          <StyledLink to="/login" onClick={handleResetState}>
            Login Here
          </StyledLink>
        </div>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;
