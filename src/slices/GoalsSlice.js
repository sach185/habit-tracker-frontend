import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { SERVER_URL } from "helper/constants";

const initGoalsState = {
  goalsList: [],
  loading: "idle",
  error: null,
};

export const getGoals = createAsyncThunk(
  "goals/get",
  async (token, thunkAPI) => {
    //call the api to get all goals
    try {
      const response = await Axios.get(`${SERVER_URL}/goals`, {
        headers: { Authorization: "Bearer " + token },
      });
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
      let token = payload.token;
      payload.token = undefined;
      const response = await Axios.post(`${SERVER_URL}/goals`, payload, {
        headers: { Authorization: "Bearer " + token },
      });
      if (payload.goalId) {
        const { dispatch } = thunkAPI;
        dispatch(getGoals(token));
        return;
      }
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
      const { token, goalId } = payload;
      await Axios.delete(`${SERVER_URL}/goals/${goalId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const { dispatch } = thunkAPI;
      dispatch(getGoals(token));
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
        state.goalsList = [...action.payload.data];
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
      if (action.payload && state.loading === "pending") {
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
    [deleteGoal.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default goalsSlice.reducer;
