import { createAsyncThunk } from "@reduxjs/toolkit";
import { CheckAuthApi } from "../../services/auth.service";


export const checkAuth = createAsyncThunk("auth/me",
    async (_, { rejectWithValue }) => {
        try {
            return await CheckAuthApi();
        } catch (err) {
            return rejectWithValue(null);
        }
    }
)