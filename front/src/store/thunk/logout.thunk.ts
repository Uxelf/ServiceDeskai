import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LogoutRequest, type LogoutResponse } from "../../types/auth.types";
import { LogoutApit } from "../../services/auth.service";


export const logout = createAsyncThunk<
    LogoutResponse,
    LogoutRequest,
    { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
    try {
        return await LogoutApit();
    } catch (err) {
        return rejectWithValue("Error logging out");
    }
});