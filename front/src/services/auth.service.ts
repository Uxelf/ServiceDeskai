import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/auth.types";
import api from "./api";


export async function loginApi(
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
                error.response?.data?.message ||
                "Credenciales incorrectas";

            throw new Error(message);
        }

        throw new Error("Error inesperado al hacer login");
    }
}