import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/UserSlice";
import goalsReducer from "slices/GoalsSlice";
import moodReducer from "slices/MoodSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
    mood: moodReducer
  },
});
