import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createMood } from "slices/MoodSlice";

const Root = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 100%;

  @media only screen and (max-width: 699px) {
    font-size: 20px;
    padding: 20px 40px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 26px;
  }
`;

const DayDiv = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 20px;
`;

const LabelItem = styled.div`
font-size: 16px;
margin-bottom: 2px;
`;

const TextAreaItem = styled.textarea`
font-size: 15px;
width: 50%;
height: 300px;
`;

const RatingDiv = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 20px;
`;

const SubmitBtn = styled.button`
width: 100px;
font-size: 14px;
font-weight: 500;
padding: 4px 0px;
`;


const SelectItem = styled.select`
width: 200px;
font-size: 15px;
padding: 2px 6px;
`;

const UpdateMood = (props) => {
  // State for notes and rating
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (props.notes) {
      setNotes(props.notes);
    }

    if (props.rating) {
      setRating(props.rating);
    }
  }, []);

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;
  const dispatch = useDispatch();

  // Handle input change for notes
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  // Handle dropdown change for rating
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the notes and rating to your backend or perform any other action
    const isoDateString = moment(props.date).format('YYYY-MM-DDTHH:mm:ss.SSS');
    const payload = {
      token: loggedInUser.token,
      rating,
      notes,
      date: isoDateString,
      userId: loggedInUser._id
    };

    if (props.isUpdate) {
      payload.moodId = props.moodId;
    }

    if (notes && rating) {
      dispatch(createMood(payload));
      props.onUpdate();
    }
  };

  return (
    <Root>
      <DayDiv>
        <LabelItem htmlFor="notes">Describe your day:</LabelItem>
        <TextAreaItem id="notes" value={notes} onChange={handleNotesChange} />
      </DayDiv>
      <RatingDiv>
        <LabelItem htmlFor="rating">Mood:</LabelItem>
        <SelectItem id="rating" value={rating} onChange={handleRatingChange}>
        <option value={0} disabled>Set your mood</option>
          <option value={1}>Very Sad / Angry</option>
          <option value={2}>Sad</option>
          <option value={3}>Neutral</option>
          <option value={4}>Happy</option>
          <option value={5}>Very Happy / Excited</option>
        </SelectItem>
      </RatingDiv>
      <SubmitBtn onClick={handleSubmit} type="submit">Submit</SubmitBtn>
    </Root>
  );
};

export default UpdateMood;
