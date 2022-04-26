import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "slices/GoalsSlice";

const InnerAddGoalButton = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  width: ${(props) => (props.isUpdate ? "auto" : "100%")};
  cursor: pointer;
  img {
    height: ${(props) => (props.isUpdate ? "15px" : "auto")};
    max-width: 16px;
    margin-right: 8px;
  }

  @media only screen and (max-width: 699px) {
    font-size: 16px;
    justify-content: flex-end;
  }

  @media only screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: 20px;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 699px) {
    width: 275px;
  }

  @media only screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: 20px;
    width: 375px;
  }
`;

const ModalTitle = styled.div`
  margin-bottom: 20px;

  @media only screen and (max-width: 699px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 700px) {
    font-size: 30px;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
    font-size: 15px;
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

const ErrorSection = styled.div`
  color: red;
  font-size: 15px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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

const AddGoal = ({
  isUpdate,
  goalName,
  goalFrequency,
  goalTimeSlot,
  goalId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [goalInfo, setGoalInfo] = useState({
    name: goalName || "",
    weeklyFrequency: goalFrequency || "",
    timeSlot: goalTimeSlot || "",
  });

  const handleGoalInfoChange = (e) => {
    const { id, value } = e.target;
    setGoalInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setError(null);
    if (!isUpdate) setGoalInfo({ name: "", weeklyFrequency: "", timeSlot: "" });
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let { name, weeklyFrequency, timeSlot } = goalInfo;
    setError(null);
    if (!name) {
      setError("Please enter a goal name");
      return;
    } else if (
      !weeklyFrequency ||
      weeklyFrequency < 3 ||
      weeklyFrequency > 10
    ) {
      setError("Please enter number of times between 3 and 10");
      return;
    } else if (!timeSlot) {
      setError("Please enter a time slot");
      return;
    }
    // dispatch create goal action TODO
    const payload = {
      token: loggedInUser.token,
      name,
      weeklyFrequency,
      timeSlot,
    };

    if (isUpdate) {
      payload.goalId = goalId;
    }

    dispatch(createGoal(payload));
    closeModal();
  };

  return (
    <>
      <InnerAddGoalButton isUpdate={isUpdate} onClick={openModal}>
        <img
          src={`${isUpdate ? "edit.svg" : "add.svg"}`}
          width="15px"
          height="15px"
          alt="add-goal-btn"
        />
        {isUpdate ? "" : "Add a Goal"}
      </InnerAddGoalButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>
            {isUpdate ? "Update Goal" : "Create a New Goal"}
          </ModalTitle>
          {error && <ErrorSection>{error}</ErrorSection>}
          <InputSection>
            <label htmlFor="name">Enter a goal name</label>
            <input
              type="text"
              id="name"
              placeholder="Goal Name"
              maxLength="50"
              onChange={handleGoalInfoChange}
              required
              value={goalInfo.name}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="weeklyFrequency">Times in a week</label>
            <input
              type="number"
              id="weeklyFrequency"
              placeholder="How many times in a week?"
              onChange={handleGoalInfoChange}
              min="3"
              max="10"
              required
              value={goalInfo.weeklyFrequency}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="timeSlot">Choose a time slot</label>
            <input
              type="time"
              id="timeSlot"
              name="timeSlot"
              onChange={handleGoalInfoChange}
              required
              value={goalInfo.timeSlot}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              {isUpdate ? "Update Goal" : "Create Goal"}
            </SubmitButton>
          </ButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default AddGoal;
