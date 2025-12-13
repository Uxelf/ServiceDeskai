import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Office } from "../../types/office.types";

interface UserState {
    username?: string;
    role?: string;
    prefferedOffice?: Office;
}

const initialState: UserState = {};

// Creamos el slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        logout: () => {
            return {};
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
