import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initGoalsState = {
  goalsList: [],
  loading: "idle",
  error: null,
};

export const getGoals = createAsyncThunk(
  "goals/get",
  async (userId, thunkAPI) => {
    //call the api to get all goals
    try {
      const response = await Axios.get(`/goals/${userId}`);
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/create",
  async (payload, thunkAPI) => {
    try {
      const response = await Axios.post("/goals", payload);
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (payload, thunkAPI) => {
    try {
      const { userId, goalId } = payload;
      await Axios.delete(`/goals/delete/${userId}/${goalId}`);
      const { dispatch } = thunkAPI;
      dispatch(getGoals(payload));
      return;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState: initGoalsState,
  reducers: {},
  extraReducers: {
    [getGoals.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getGoals.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.goalsList = action.payload.data;
      }
    },
    [getGoals.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [createGoal.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [createGoal.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.goalsList = action.payload.goals;
      }
    },
    [createGoal.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [deleteGoal.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [deleteGoal.fulfilled]: (state) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    },
    [deleteGoal.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default goalsSlice.reducer;
