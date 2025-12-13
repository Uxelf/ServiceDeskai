import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LoginResponse, type LoginRequest } from "../../types/auth.types";
import { loginApi } from "../../services/auth.service";


export const loginThunk = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        return await loginApi(credentials);
    } catch {
        return rejectWithValue("Credenciales incorrectas");
    }
}
)