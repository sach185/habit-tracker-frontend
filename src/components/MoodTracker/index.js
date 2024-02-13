import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./yearPicker.css";
import MonthView from "./monthView";
import DayView from "./dayView";
import UpdateMood from "./updateMood";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentYearMood, getAllMonthsMood } from "slices/MoodSlice";

const Root = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  position: relative;

  @media only screen and (max-width: 699px) {
    font-size: 20px;
    padding: 20px 40px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 26px;
  }
`;

const HeaderItem = styled.div`
  position: absolute;
  left: 10;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;

const ImageItem = styled.img`
  cursor: pointer;

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;

const YearItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
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

const TitleSpan = styled.span`
  font-size: 16px;
  margin-left: 10px;
  visibility: visible;

  @media only screen and (max-width: 699px) {
    font-size: 12px;
    visibility: hidden;
  }
`;

const HeaderSpan = styled.span`
  font-size: 20px;
  margin-left: 10px;
  font-weight: 600;

  @media only screen and (max-width: 699px) {
    font-size: 16px;
    padding: 0px 45px;
  }
`;

const RatingText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;

  @media only screen and (max-width: 699px) {
    font-size: 16px;
    padding: 0px 45px;
  }
`;

const MoodTracker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isMonthView, setMonthView] = useState(true);
  const [isDayView, setDayView] = useState(false);
  const [isUpdateView, setUpdateView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [moodId, setMoodId] = useState(null);

  const dispatch = useDispatch();
  const moodState = useSelector((state) => state.mood);
  const { yearData, monthlyData } = moodState;

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  useEffect(() => {
    if (loggedInUser) {
      //dispatch action to get year data
      dispatch(
        getCurrentYearMood({
          token: loggedInUser.token,
          userId: loggedInUser._id,
          year: moment(startDate).format("yyyy"),
        })
      );
      dispatch(
        getAllMonthsMood({
          token: loggedInUser.token,
          userId: loggedInUser._id,
          year: moment(startDate).format("yyyy"),
        })
      );
    }
  }, [dispatch, startDate, loggedInUser]);

  if (!loggedInUser) {
    return <div style={{ padding: "50px" }}>Please Login to continue</div>;
  }

  const yearChange = (date) => {
    setStartDate(date);
    setMonthView(true);
    setDayView(false);
    setUpdateView(false);
  };

  const onMonthSelect = (month) => {
    setMonthView(false);
    setDayView(true);
    setSelectedMonth(month);
    setUpdateView(false);
  };

  const onDaySelect = (day, rating = 0, notes = "", id) => {
    setMonthView(false);
    setDayView(false);
    setSelectedDay(day);
    setUpdateView(true);
    setNotes(notes);
    setRating(rating);
    setMoodId(id);
  };

  const handleUpdate = () => {
    setTimeout(() => {
      onMonthSelect(selectedMonth);
    }, 500);

    setTimeout(() => {
      dispatch(
        getCurrentYearMood({
          token: loggedInUser.token,
          userId: loggedInUser._id,
          year: moment(startDate).format("yyyy"),
        })
      );
      dispatch(
        getAllMonthsMood({
          token: loggedInUser.token,
          userId: loggedInUser._id,
          year: moment(startDate).format("yyyy"),
        })
      );
    }, 2000);
  };

  const currentYear = new Date().getFullYear();
  const minDate = new Date(2024, 0, 1);
  const maxDate = new Date(currentYear, 11, 31);

  const filterDate = (date) => {
    const year = date.getFullYear();
    return year >= 2024 && year <= currentYear;
  };

  const goBack = () => {
    if (isUpdateView) {
      onMonthSelect(selectedMonth);
    } else {
      yearChange(startDate);
    }
  };

  let showYear = !isDayView && !isUpdateView;

  let yearRatingText = "";
  if (yearData && yearData.avgRating) {
    let yearRating = Math.ceil(yearData.avgRating);
    switch (yearRating) {
      case 1:
        yearRatingText = "You had a very sad year so far ='(";
        break;
      case 2:
        yearRatingText = "You had a sad year so far :(";
        break;
      case 3:
        yearRatingText = "You had an ok-ok year so far";
        break;
      case 4:
        yearRatingText = "You had a happy year so far :)";
        break;
      case 5:
        yearRatingText = "You had a very happy year so far! =D";
        break;
      default:
        break;
    }
  }

  return (
    <Root>
      {(isDayView || isUpdateView) && (
        <HeaderItem onClick={goBack}>
          <ImageItem src="/arrow_back.svg" alt="back" />
          <TitleSpan>{`Go back`}</TitleSpan>
        </HeaderItem>
      )}
      <YearItem>
        {showYear && (
          <DatePicker
            selected={startDate}
            onChange={(date) => yearChange(date)}
            dateFormat="yyyy"
            showYearPicker
            minDate={minDate}
            maxDate={maxDate}
            filterDate={filterDate}
            className="custom-year-picker"
            yearItemNumber={5}
          />
        )}

        {isDayView && (
          <HeaderSpan>{`${moment()
            .month(selectedMonth)
            .format("MMMM")} ${moment(startDate).year()}`}</HeaderSpan>
        )}
        {isUpdateView && (
          <HeaderSpan>{`Update mood for ${moment(
            new Date(moment(startDate).year(), selectedMonth, selectedDay)
          ).format("dddd DD MMM yyyy")}`}</HeaderSpan>
        )}
      </YearItem>
      {yearRatingText && showYear && (
        <YearItem>
          <RatingText>{yearRatingText}</RatingText>
        </YearItem>
      )}

      <InfoParent>
        {isMonthView && (
          <MonthView
            selectedYear={startDate}
            onMonthSelect={onMonthSelect}
            monthlyData={monthlyData}
          />
        )}
        {isDayView && (
          <DayView
            selectedYear={startDate}
            selectedMonth={selectedMonth}
            onDaySelect={onDaySelect}
          />
        )}
        {isUpdateView && (
          <UpdateMood
            date={
              new Date(moment(startDate).year(), selectedMonth, selectedDay)
            }
            onUpdate={handleUpdate}
            notes={notes}
            rating={rating}
            moodId={moodId}
          />
        )}
      </InfoParent>
    </Root>
  );
};

export default MoodTracker;
