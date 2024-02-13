import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { SERVER_URL } from "helper/constants";

//initial state of goals reducer
const initMoodState = {
  yearData: null,
  monthlyData: [],
  dailyData: [],
  loading: "idle",
  error: null,
};

//call the api to get daily mood
export const getAllDaysMood = createAsyncThunk(
  "mood/getDailyMood",
  async (payload, thunkAPI) => {
    try {
      const response = await Axios.get(
        `${SERVER_URL}/mood/daily-mood/${payload.userId}/${payload.year}/${payload.month + 1}`,
        {
          headers: { Authorization: "Bearer " + payload.token },
        }
      );
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//call the api to get monthly mood
export const getAllMonthsMood = createAsyncThunk(
  "mood/getMonthlyMood",
  async (payload, thunkAPI) => {
    try {
      const response = await Axios.get(
        `${SERVER_URL}/mood/monthly-mood/${payload.userId}/${payload.year}`,
        {
          headers: { Authorization: "Bearer " + payload.token },
        }
      );
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//call the api to get yearly mood
export const getCurrentYearMood = createAsyncThunk(
  "mood/getYearMood",
  async (payload, thunkAPI) => {
    try {
      const response = await Axios.get(
        `${SERVER_URL}/mood/year-mood/${payload.userId}/${payload.year}`,
        {
          headers: { Authorization: "Bearer " + payload.token },
        }
      );
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//call the api to create or update a mood
export const createMood = createAsyncThunk(
  "mood/create",
  async (payload, thunkAPI) => {
    try {
      let token = payload.token;
      payload.token = undefined;
      const response = await Axios.post(`${SERVER_URL}/mood`, payload, {
        headers: { Authorization: "Bearer " + token },
      });
      //   if (payload.goalId) {
      //     const { dispatch } = thunkAPI;
      //     dispatch(getGoals(token));
      //     return;
      //   }
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//Mood slice setup - state, actions, reducer
const moodSlice = createSlice({
  name: "mood",
  initialState: initMoodState,
  reducers: {},
  extraReducers: {
    [getAllDaysMood.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getAllDaysMood.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.dailyData = [...action.payload.data];
      }
    },
    [getAllDaysMood.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [getAllMonthsMood.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getAllMonthsMood.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.monthlyData = [...action.payload.data];
      }
    },
    [getAllMonthsMood.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [getCurrentYearMood.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getCurrentYearMood.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.yearData = action.payload.data;
      }
    },
    [getCurrentYearMood.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [createMood.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [createMood.fulfilled]: (state, action) => {
      if (action.payload && state.loading === "pending") {
        state.loading = "idle";
        state.goalsList = action.payload.goals;
      }
    },
    [createMood.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default moodSlice.reducer;
