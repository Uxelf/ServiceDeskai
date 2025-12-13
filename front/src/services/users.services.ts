import axios from "axios";
import type { UserUpdateRequest, UserUpdateResponse } from "../types/user.types";
import api from "./api";


export async function updateUserApi(
    data: UserUpdateRequest
): Promise<UserUpdateResponse> {
    try {
        const response = await api.patch<UserUpdateResponse>('/users', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.message ||
                "Error updating";

            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}