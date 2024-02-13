import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "slices/UserSlice";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  background-color: #fcfcf7;
  height: 50px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
`;

const InnerRoot = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  padding: 10px 10px 10px 30px;
  color: #0f151f;
  align-items: center;
  gap: 12px;
`;

const MyLink = styled(Link)`
  color: #9da631;
  text-decoration: none;
  font-weight: 600;
`;

const LogoLink = styled(Link)`
  height: 30px;
`;

const Logo = styled.img`
  width: 30px;
  height: 27px;
`;

const LogoutButton = styled.button`
  background-color: #9da631;
  border: none;
  border-radius: 20px;
  padding: 7px 15px 8px 15px;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const LoginButton = styled(Link)`
  background-color: #9da631;
  border: none;
  border-radius: 20px;
  padding: 7px 15px 8px 15px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  text-decoration: none;
  :hover {
    cursor: pointer;
    background-color: #4e5318;
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: end;
`;

const RegisterButton = styled(Link)`
  color: #9da631;
  text-decoration: none;
  margin-right: 20px;
  :hover {
    cursor: pointer;
    color: #4e5318;
  }
`;

//Header for the website
const Header = () => {
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  useEffect(() => {
    //Reset your current tasks for the day
    let taskList = JSON.parse(localStorage.getItem("todaysTask"));
    if (taskList) {
      let newArr = taskList.filter((item) => {
        let storedDate = item.date;
        let today = new Date();
        let todaysDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;

        return storedDate === todaysDate;
      });
      if (taskList.length !== newArr.length)
        localStorage.setItem("todaysTask", JSON.stringify(newArr));
    }
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  //Show header options depending on login state
  return (
    <Root className="root">
      <InnerRoot>
        <LogoLink to="/">
          <Logo src="/logo.svg" alt="logo" />
        </LogoLink>
        <MyLink to="/">Home</MyLink>
        <MyLink to="/mood">Mood Tracker</MyLink>
        <RightDiv>
          {loggedInUser && <MyLink to="/habits">My Habits</MyLink>}
          {!loggedInUser ? (
            <>
              <RegisterButton to="/register">Register</RegisterButton>
              <LoginButton to="/login">Login</LoginButton>
            </>
          ) : (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          )}
        </RightDiv>
      </InnerRoot>
    </Root>
  );
};

export default Header;
