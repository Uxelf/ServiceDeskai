import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginRequest, LoginResponse } from "../../types/auth.types";
import { loginApi } from '../../services/auth.service'

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
        role: string;
        prefferedOffice: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
    try {
        return await loginApi(data);
    } catch (err) {
        return rejectWithValue("Invalid user or password");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error desconocido";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
