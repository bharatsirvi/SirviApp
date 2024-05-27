import { configureStore } from "@reduxjs/toolkit";
import { loginDataSlice } from "./loginSlice.js";
import { fetchStatusSlice } from "./fetchStatusSlice.js";
import userDataReducer from "./userDataSlice";
const store = configureStore({
  reducer: {
    loginData: loginDataSlice.reducer,
    userData: userDataReducer,
    fetchStatus: fetchStatusSlice.reducer
  }
});

export default store;
