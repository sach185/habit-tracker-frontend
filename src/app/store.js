import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/UserSlice";
import goalsReducer from "slices/GoalsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
  },
});
