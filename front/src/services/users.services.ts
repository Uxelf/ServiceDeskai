import axios from "axios";
import type { CreateUserRequest, CreateUserResponse, UserUpdateRequest, UserUpdateResponse } from "../types/user.types";
import api from "./api";


export async function UpdateUserApi(
    data: UserUpdateRequest
): Promise<UserUpdateResponse> {
    try {
        const response = await api.patch<UserUpdateResponse>('/users', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.error ||
                "Error updating";

            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}

export async function CreateUserApi(data: CreateUserRequest) {
    try {
        const response = await api.post<CreateUserResponse>('/users', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.error ||
                "Error while creating user";

            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}