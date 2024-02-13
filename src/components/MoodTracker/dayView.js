import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { getAllDaysMood } from "slices/MoodSlice";

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

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;

const DayDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
  width: 11%;
  border-radius: 6px;
  cursor: pointer;

  @media only screen and (max-width: 699px) {
    width: 25%;
  }
`;

const DayTitle = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 5px 0px;
  border-bottom: 1px solid #c0c0c0;
  font-weight: 600;
  color: ${({ color }) => {
    return color;
  }};
  background-color: ${({ bgColor }) => {
    return bgColor;
  }};
  border-radius: 6px 6px 0px 0px;

  @media only screen and (max-width: 699px) {
    font-size: 15px;
  }
`;

const DayNoTitle = styled.div`
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
`;

const RatingBody = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayRating = styled.img`
  width: 80px;
  height: 80px;

  @media only screen and (max-width: 699px) {
    width: 30px;
    height: 30px;
  }
`;

export const DayView = ({ selectedYear, selectedMonth, onDaySelect }) => {
  const dispatch = useDispatch();
  const moodState = useSelector((state) => state.mood);
  const { dailyData } = moodState;

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getAllDaysMood({ token: loggedInUser.token, userId: loggedInUser._id, year: moment(selectedYear).year(), month: selectedMonth }));
    }
  }, [dispatch, loggedInUser, selectedMonth, selectedYear]);

  let selectedYr = moment(selectedYear).year();
  let dayDiv = [];

  let daysInMonth = new Date(selectedYr, selectedMonth + 1, 0).getDate();

  if (
    selectedYr === moment(new Date()).year() &&
    selectedMonth === moment(new Date()).month()
  ) {
    daysInMonth = moment(new Date()).date();
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(selectedYr, selectedMonth, day);
    let rating = 0;
    let notes = "";

    if (dailyData?.length) {
      const currentElement = dailyData.find((obj) => moment(obj.timestamp).date() === day);
      if (currentElement) {
        rating = currentElement.rating;
        notes = currentElement.notes;
      }
    }
    
    dayDiv.push(
      <DayBox
        key={day}
        day={moment(date).format("dddd")}
        onDaySelect={onDaySelect}
        rating={rating}
        dayNo={moment(date).format("DD")}
        notes={notes}
      />
    );
  }

  return (
    <Root>
      <InnerRoot>{dayDiv}</InnerRoot>
    </Root>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DayView);

const DayBox = ({ day, rating = 0, onDaySelect, dayNo, notes }) => {
  let src = "";
  let bgColor = "#DDDAC2";
  let color = "white";

  switch (rating) {
    case 1:
      src = "/icons/very_sad.png";
      bgColor = "#FF1A1A";
      color = "white";
      break;
    case 2:
      src = "/icons/sad.png";
      bgColor = "#EDA284";
      color = "white";
      break;
    case 3:
      src = "/icons/neutral.png";
      bgColor = "#FFAA33";
      color = "white";
      break;
    case 4:
      src = "/icons/happy.png";
      bgColor = "#4DBFC5";
      color = "white";
      break;
    case 5:
      src = "/icons/very_happy.png";
      bgColor = "#E97D92";
      color = "white";
      break;
    default:
      src = "/icons/zipped_face.png";
      bgColor = "#DDDAC2";
      color = "white";
      break;
  }

  return (
    <DayDiv onClick={() => onDaySelect(dayNo, rating, notes)} className="day-box">
      <DayTitle bgColor={bgColor} color={color}>
        {day}
      </DayTitle>
      <DayNoTitle bgColor={bgColor} color={color}>
        {dayNo}
      </DayNoTitle>
      <RatingBody>
        <DayRating src={src} alt="mood" />
      </RatingBody>
    </DayDiv>
  );
};
