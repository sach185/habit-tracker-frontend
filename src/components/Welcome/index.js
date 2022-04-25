import React from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  @media only screen and (max-width: 699px) {
    font-size: 20px;
    padding: 20px 40px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 26px;
  }
`;

const HeaderItem = styled.div`
  color: #1c242b;
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 5px;
  text-align: center;

  @media only screen and (max-width: 699px) {
    margin-top: 10px;
  }

  @media only screen and (min-width: 700px) {
    margin-top: 20px;
  }
`;

const ParentItem = styled.div`
  font-size: 22px;
  text-align: center;
  color: #1c242b;
  @media only screen and (max-width: 699px) {
    margin-top: 10px;
  }

  @media only screen and (min-width: 700px) {
    margin-top: 20px;
  }
`;

const HeaderChildItem = styled.div`
  color: #a8afb3;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;

  @media only screen and (max-width: 699px) {
    font-size: 19px;
  }

  @media only screen and (min-width: 700px) {
  }
`;

const ChildItem = styled.div`
  color: #a8afb3;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 17px;
  letter-spacing: 1px;
  @media only screen and (max-width: 699px) {
    margin-top: 15px;
  }

  @media only screen and (min-width: 700px) {
    margin-top: 20px;
  }
`;

const InfoParent = styled.div`
  display: flex;
  @media only screen and (max-width: 699px) {
    flex-direction: column;
    margin-top: 30px;
    gap: 40px;
  }

  @media only screen and (min-width: 700px) {
    flex-direction: row;
    margin-top: 30px;
  }
`;

const InfoChild = styled.div`
  display: block;
  text-align: center;

  @media only screen and (min-width: 700px) {
    width: 33%;
    padding: 40px 60px;
    box-sizing: border-box;
  }
`;

const ImageItem = styled.img`
  height: 40px;
`;

const Welcome = (props) => {
  return (
    <Root>
      <HeaderItem>A Simple and Beautiful Habit Tracker</HeaderItem>
      <HeaderChildItem>Form new habits to achieve your goals</HeaderChildItem>

      <InfoParent>
        <InfoChild>
          <ImageItem src="/newgoal.svg" alt="new-goal" />
          <ParentItem>Start a new goal</ParentItem>
          <ChildItem>
            Define the new habit that you want to incorporate in your life
          </ChildItem>
        </InfoChild>

        <InfoChild>
          <ImageItem src="/track.svg" alt="new-goal" />
          <ParentItem>Track your goals</ParentItem>
          <ChildItem>
            Keep track and update your goals whenever you complete them in the
            week
          </ChildItem>
        </InfoChild>

        <InfoChild>
          <ImageItem src="/reward.svg" alt="new-goal" />
          <ParentItem>Earn Rewards</ParentItem>
          <ChildItem>
            Unlock more goal slots as and when you finish your ongoing tasks
          </ChildItem>
        </InfoChild>
      </InfoParent>
    </Root>
  );
};

export default Welcome;
