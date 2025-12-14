import axios from "axios";
import type { LoginRequest, LoginResponse, LogoutResponse } from "../types/auth.types";
import api from "./api";


export async function LoginApi(
    data: LoginRequest
): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>(
            "/auth/login",
            data
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.error ||
                "Wrong credentials";

            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}

export async function CheckAuthApi(): Promise<LoginResponse> {
    try {
        const response = await api.get<LoginResponse>("/auth/me");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.error ||
                "Unauthorised";
            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}

export async function LogoutApit(): Promise<LogoutResponse> {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.error ||
                "Error";
            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}