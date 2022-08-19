import { createSlice } from "@reduxjs/toolkit";
import IUserInfo from "../../Interfaces/iUserInfo";

import type { RootState } from "../store";
import { ISetUserPayload, UserState } from "./LoginSliceTypes";

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: ISetUserPayload) => {
      let user: IUserInfo | null = action.payload?.user ?? null;
      state.user = user;
    },
    cleanUser: (state) => {
      state.user = null;
    },
  },
});

// this is for dispatch
export const { setUser, cleanUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
