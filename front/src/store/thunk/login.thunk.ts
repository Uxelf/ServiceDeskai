import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LoginResponse, type LoginRequest } from "../../types/auth.types";
import { LoginApi } from "../../services/auth.service";


export const login = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
    try {
        return await LoginApi(data);
    } catch (err) {
        return rejectWithValue("Invalid user or password");
    }
});