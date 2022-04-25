import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "slices/GoalsSlice";
import AddGoal from "./AddGoal";
import UpdateGoal from "./UpdateGoal";
import DeleteGoal from "./DeleteGoal";

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 699px) {
    padding: 20px 20px;
  }

  @media only screen and (min-width: 700px) {
    padding: 20px 10px;
  }
`;
const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;

  @media only screen and (max-width: 699px) {
  }

  @media only screen and (min-width: 700px) {
  }
`;
const TitleSection = styled.div`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 30px;

  @media only screen and (max-width: 699px) {
    font-size: 26px;
    width: 100%;
  }

  @media only screen and (min-width: 700px) {
    width: 300px;
  }
`;
const GoalRow = styled.div`
  display: grid;
  align-items: center;
  margin-bottom: 25px;
  background-color: #fcfcf7;
  padding: 10px 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 30px 50px;

  :last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 699px) {
    justify-content: start;
  }

  @media only screen and (min-width: 700px) {
  }
`;

const Name = styled.div`
  font-weight: 600;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 20px;
    margin-right: 8px;
  }

  @media only screen and (max-width: 699px) {
    margin-left: 20px;
    gap: 5px;
    justify-content: flex-end;
  }

  @media only screen and (min-width: 700px) {
  }
`;

const UpdateTaskBtn = styled.button`
  background-color: #9da631;
  border: none;
  border-radius: 20px;
  color: white;
  padding: 8px 0px;
`;

const CompletedDiv = styled.div`
  grid-column: 1/-1;

  @media only screen and (max-width: 699px) {
    font-size: 15px;
  }

  @media only screen and (min-width: 700px) {
  }
`;

const MyGoals = () => {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals);
  const { goalsList, loading } = goalState;

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  let showAddBtn = goalsList && goalsList.length < loggedInUser.goalLimit;

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getGoals(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  return (
    <GoalsContainer>
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
          <GoalsHeader>
            <TitleSection>
              {`GOALS ${
                goalsList && goalsList.length + "/" + loggedInUser.goalLimit
              }`}
            </TitleSection>
            {showAddBtn && <AddGoal />}
          </GoalsHeader>
          {goalsList &&
            goalsList.map((goal) => (
              <GoalRow key={`goal-number-` + goal._id}>
                <Name>{goal.name}</Name>
                <Action>
                  <UpdateGoal goalId={goal._id} />
                  <DeleteGoal goalId={goal._id} goalName={goal.name} />
                </Action>
                <CompletedDiv>
                  {`Completed ${goal.goalCount}/${goal.weeklyFrequency} times this week`}
                </CompletedDiv>
                <UpdateTaskBtn>Update For Today</UpdateTaskBtn>
              </GoalRow>
            ))}
        </>
      )}
    </GoalsContainer>
  );
};

export default MyGoals;
