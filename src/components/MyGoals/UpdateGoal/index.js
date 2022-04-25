import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "slices/GoalsSlice";

const InnerUpdateGoalButton = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 15px;
    max-width: 16px;
    margin-right: 8px;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
`;

const ModalTitle = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
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

const ErrorSection = styled.div`
  color: red;
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

const UpdateGoal = ({ goalId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [goalName, setGoalName] = useState("");

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowError(false);
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!goalName) {
      setShowError(true);
      return;
    }
    // dispatch create goal action
    const payload = {
      userId: loggedInUser._id,
      name: goalName,
      goalId: goalId,
    };
    dispatch(createGoal(payload));
  };

  return (
    <>
      <InnerUpdateGoalButton onClick={openModal}>
        <img src="/edit.svg" alt="add-goal-btn" />
      </InnerUpdateGoalButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>Update Goal</ModalTitle>
          <InputSection>
            <label htmlFor="createGoal">Enter a goal name</label>
            {showError && <ErrorSection>Enter a goal name</ErrorSection>}
            <input
              type="text"
              id="goalName"
              placeholder="Goal Name"
              maxLength="50"
              onChange={(e) => setGoalName(e.target.value)}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Update Goal
            </SubmitButton>
          </ButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default UpdateGoal;