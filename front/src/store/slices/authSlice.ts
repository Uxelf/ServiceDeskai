import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunk/login.thunk";
import { logout as logoutThunk } from "../thunk/logout.thunk";
import { checkAuth } from "../thunk/checkAuth.thunk";
import { updateProfile } from "../thunk/updateProfile.thunk";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
        role: string;
        office: string;
        name?: string;
        surname?: string;
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
            // === login ===
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
                state.error = action.payload ?? "Unknow error";
            })
            // === logout ===
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state, _) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknow error";
            })
            // === checkAuth ===
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })
            // === updateProfile ===
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error updating";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
