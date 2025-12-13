import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthApi } from "../../services/auth.service";


export const checkAuth = createAsyncThunk("auth/me",
    async (_, { rejectWithValue }) => {
        try {
            return await checkAuthApi();
        } catch (err) {
            return rejectWithValue(null);
        }
    }
)