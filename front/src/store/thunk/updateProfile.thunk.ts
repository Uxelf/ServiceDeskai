import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserUpdateRequest, UserUpdateResponse } from "../../types/user.types";
import { UpdateUserApi } from "../../services/users.services";

export const updateProfile = createAsyncThunk<
    UserUpdateResponse,
    UserUpdateRequest,
    { rejectValue: string }
>('/users/updateProfile', async (data, { rejectWithValue }) => {
    try {
        return await UpdateUserApi(data);
    } catch (error) {
        return rejectWithValue("Error updating profile");
    }
});