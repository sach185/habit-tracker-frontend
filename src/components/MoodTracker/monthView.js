import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;

const InnerRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  justify-content: center;
  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;

const MonthDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
  width: 200px;
  border-radius: 6px;
  cursor: pointer;
`;

const MonthTitle = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 5px 0px;
  border-bottom: 1px solid black;
  font-weight: 600;
  color: ${({ color }) => {
    return color;
  }};
  background-color: ${({ bgColor }) => {
    return bgColor;
  }};
  border-radius: 6px 6px 0px 0px;
`;

const RatingBody = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RatingText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 4px;
`;


const MonthRating = styled.img`
  width: 80px;
  height: 80px;

  @media only screen and (max-width: 699px) {
    width: 60px;
  height: 60px;
  }
`;

export const MonthView = ({ selectedYear, onMonthSelect, monthlyData }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = 11

  if (moment(selectedYear).year() === moment(new Date()).year()) {
    currentMonth = moment(new Date()).month();
  }

  let monthDiv = [];


  for (let i = 0; i <= currentMonth; i++) {

    let rating = 0;
  
    if (monthlyData?.length) {
      const currentElement = monthlyData.find((obj) => obj.month === i);
      if (currentElement) {
        rating = Math.ceil(currentElement.avgRating);
      }
    }

    monthDiv.push(
      <MonthBox
        key={i}
        month={months[i]}
        onMonthSelect={onMonthSelect}
        monthNo={i}
        rating={rating}
      />
    );
  }

  return (
    <Root>
      <InnerRoot>{monthDiv}</InnerRoot>
    </Root>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);

const MonthBox = ({ month, rating = 0, onMonthSelect, monthNo }) => {
  let src = "";
  let bgColor = "#DDDAC2";
  let color = "white";
  let ratingText = "Add some ratings!"

  switch (rating) {
    case 1:
      src = "/icons/very_sad.png";
      bgColor = "#FF1A1A";
      color = "white";
      ratingText = "Very sad!";
      break;
    case 2:
      src = "/icons/sad.png";
      bgColor = "#EDA284";
      color = "white";
      ratingText = "Sad";
      break;
    case 3:
      src = "/icons/neutral.png";
      bgColor = "#FFAA33";
      color = "white";
      ratingText = "Neutral";
      break;
    case 4:
      src = "/icons/happy.png";
      bgColor = "#4DBFC5";
      color = "white";
      ratingText = "Happy";
      break;
    case 5:
      src = "/icons/very_happy.png";
      bgColor = "#E97D92";
      color = "white";
      ratingText = "Very happy!";
      break;
    default:
      src = "/icons/zipped_face.png";
      bgColor = "#DDDAC2";
      color = "white";
      break;
  }

  return (
    <MonthDiv onClick={() => onMonthSelect(monthNo)} className="month-box">
      <MonthTitle bgColor={bgColor} color={color}>
        {month}
      </MonthTitle>
      <RatingBody>
        <MonthRating src={src} alt="mood" />
      </RatingBody>
      <RatingText>
        {ratingText}
      </RatingText>
    </MonthDiv>
  );
};
