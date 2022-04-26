import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createGoal, getGoals } from "slices/GoalsSlice";
import AddGoal from "./AddGoal";
import DeleteGoal from "./DeleteGoal";
import { updateGoalLimit } from "slices/UserSlice";

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 699px) {
    padding: 20px 20px;
  }

  @media only screen and (min-width: 700px) {
    padding: 20px 10px;
    align-items: center;
  }
`;

const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;

  @media only screen and (min-width: 700px) {
    max-width: 640px;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 885px;
  }
`;

const RewardInfo = styled.div`
  width: 100%;
  margin-bottom: 20px;
  letter-spacing: 1px;
  color: #598c3f;
  @media only screen and (min-width: 700px) {
    max-width: 640px;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 880px;
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
  background-color: #fcfcf7;
  padding: 10px 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 30px 20px 50px;
  border-radius: 10px;
  :last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 699px) {
    justify-content: start;
    margin-bottom: 25px;
  }

  @media only screen and (min-width: 700px) {
    max-width: 400px;
  }
`;

const Name = styled.div`
  font-weight: 600;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  img {
    max-width: 20px;
    margin-right: 8px;
  }

  @media only screen and (max-width: 699px) {
    margin-left: 20px;
  }

  @media only screen and (min-width: 700px) {
  }
`;

const ListContainer = styled.div`
  @media only screen and (min-width: 700px) {
    display: grid;
    grid-template-columns: 300px 300px;
    justify-content: center;
    gap: 40px;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: 430px 430px;
    row-gap: 30px;
    column-gap: 30px;
  }
`;

const UpdateTaskBtn = styled.button`
  background-color: #9da631;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 8px 0px;
  width: 150px;
  cursor: pointer;

  :disabled {
    background-color: gray;
    cursor: auto;
  }
`;

const CompletedDiv = styled.div`
  grid-column: 1/-1;
  color: gray;
  font-size: 15px;
  letter-spacing: 0.5px;
`;

const GoalComplete = styled.div`
  grid-column: 1/-1;
  color: #9da631;
  font-size: 15px;
  letter-spacing: 0.5px;
`;

//Habits page. Displays list of user goals.
const MyGoals = () => {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals);
  const { goalsList } = goalState;

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;
  let taskArray = JSON.parse(localStorage.getItem("todaysTask")) || [];

  useEffect(() => {
    if (loggedInUser) {
      //dispatch action to get all goals
      dispatch(getGoals(loggedInUser.token));
    }
  }, [dispatch, loggedInUser]);

  if (!loggedInUser) {
    return <div style={{ padding: "50px" }}>Please Login to continue</div>;
  }

  let showAddBtn = goalsList && goalsList.length < loggedInUser.goalLimit;

  //update task for today
  const handleUpdate = (goal) => {
    taskArray = JSON.parse(localStorage.getItem("todaysTask")) || [];

    let today = new Date();
    let formattedDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
    taskArray.push({
      id: goal._id,
      date: formattedDate,
    });
    localStorage.setItem("todaysTask", JSON.stringify(taskArray));

    //update goal count
    let goalCount = goal.goalCount + 1;
    let payload = {
      token: loggedInUser.token,
      goalId: goal._id,
      goalCount: goalCount,
      updateCount: true,
    };

    //check if eligible for reward
    if (!goal.reward && goalCount >= goal.weeklyFrequency) {
      payload.reward = true;
      dispatch(updateGoalLimit());
    }

    //dispatch action for updating goal
    dispatch(createGoal(payload));
  };

  return (
    <GoalsContainer>
      <>
        <GoalsHeader>
          <TitleSection>
            {`GOALS ${
              goalsList && goalsList.length + "/" + loggedInUser.goalLimit
            }`}
          </TitleSection>
          {showAddBtn && <AddGoal />}
        </GoalsHeader>
        <RewardInfo>{`Rewards Earned : ${
          loggedInUser.goalLimit - 4
        }`}</RewardInfo>
        <ListContainer>
          {goalsList &&
            goalsList.map((goal) => {
              let isDone = taskArray.find((data) => {
                return data.id === goal._id;
              });

              let showBtn = goal.goalCount < goal.weeklyFrequency;

              return (
                <GoalRow key={`goal-number-` + goal._id}>
                  <Name>{goal.name}</Name>
                  <Action>
                    <AddGoal
                      isUpdate={true}
                      goalId={goal._id}
                      goalName={goal.name}
                      goalFrequency={goal.weeklyFrequency}
                      goalTimeSlot={goal.timeSlot}
                    />
                    <DeleteGoal goalId={goal._id} goalName={goal.name} />
                  </Action>
                  <CompletedDiv>
                    {`Completed ${goal.goalCount}/${goal.weeklyFrequency} times this week`}
                  </CompletedDiv>
                  <CompletedDiv>{`Time slot : ${goal.timeSlot}`}</CompletedDiv>
                  {showBtn ? (
                    <UpdateTaskBtn
                      onClick={() => handleUpdate(goal)}
                      disabled={isDone}
                    >
                      {isDone ? "Done for Today" : "Update For Today"}
                    </UpdateTaskBtn>
                  ) : (
                    <GoalComplete>Goal completed for this week!</GoalComplete>
                  )}
                </GoalRow>
              );
            })}
        </ListContainer>
      </>
    </GoalsContainer>
  );
};

export default MyGoals;
