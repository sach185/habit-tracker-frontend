import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Root = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 699px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 26px;
  }
`;

const MyLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: fit-content;
  border: 1px solid black;
  padding: 5px;
  border-radius: 4px;

  @media only screen and (max-width: 699px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 22px;
  }
`;

const Welcome = (props) => {
  return (
    <Root>
      <div>Welcome to your Habit Tracker</div>
      <MyLink to="/habits">Track your goals</MyLink>
      <MyLink to="/habits">Create new goal</MyLink>
    </Root>
  );
};

export default Welcome;
