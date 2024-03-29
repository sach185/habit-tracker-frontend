import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { SERVER_URL } from "helper/constants";

//check if user info exists in local storage to maintain login state
const userInfoString = localStorage.getItem("user_info");
const currentUserInfo = userInfoString ? JSON.parse(userInfoString) : null;

//initial state of user reducer
const initUserState = {
  loggedInUser: currentUserInfo,
  registerState: { loading: "idle", error: null, currentRequestID: undefined },
  loginState: { loading: "idle", error: null, currentRequestID: undefined },
};

//make API call to register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, thunkAPI) => {
    // error handling
    const { loading, currentRequestID } =
      thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      const response = await Axios.post(
        `${SERVER_URL}/user/register`,
        userInfo
      );
      localStorage.setItem("user_info", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//make API call to login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (userInfo, thunkAPI) => {
    // error handling
    const { loading, currentRequestID } = thunkAPI.getState().user.loginState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      const response = await Axios.post(`${SERVER_URL}/user/login`, userInfo);
      localStorage.setItem("user_info", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

//User slice setup - state, actions, reducer
const userSlice = createSlice({
  name: "user",
  initialState: initUserState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("user_info");
    },
    resetRegisterState: (state) => {
      state.registerState = initUserState.registerState;
    },
    resetLoginState: (state) => {
      state.loginState = initUserState.loginState;
    },
    updateGoalLimit: (state) => {
      let loggedinUser = initUserState.loggedInUser;
      state.loggedInUser.goalLimit = loggedinUser.goalLimit + 1;
      localStorage.setItem("user_info", JSON.stringify(state.loggedInUser));
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "idle") {
        registerState.loading = "pending";
        registerState.currentRequestID = action.meta.requestId;
      }
    },
    [registerUser.fulfilled]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "pending") {
        registerState.loading = "idle";
        registerState.currentRequestID = undefined;
        registerState.error = null;
        state.loggedInUser = action.payload;
      }
    },
    [registerUser.rejected]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "pending") {
        registerState.loading = "idle";
        registerState.currentRequestID = undefined;
        registerState.error = action.payload;
      }
    },
    [loginUser.pending]: (state, action) => {
      const { loginState } = state;
      if (loginState.loading === "idle") {
        loginState.loading = "pending";
        loginState.currentRequestID = action.meta.requestId;
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      const { loginState } = state;
      if (loginState.loading === "pending") {
        loginState.loading = "idle";
        loginState.currentRequestID = undefined;
        loginState.error = null;
        state.loggedInUser = action.payload;
      }
    },
    [loginUser.rejected]: (state, action) => {
      const { loginState } = state;
      if (loginState.loading === "pending") {
        loginState.loading = "idle";
        loginState.currentRequestID = undefined;
        loginState.error = action.payload;
      }
    },
  },
});

export const {
  logoutUser,
  resetRegisterState,
  resetLoginState,
  updateGoalLimit,
} = userSlice.actions;
export default userSlice.reducer;
