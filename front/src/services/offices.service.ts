import axios from "axios";
import type { CreateOfficeRequest, Office } from "../types/office.types";
import api from "./api";

export async function GetOffices(): Promise<Office[]> {
    try {
        const response = await api.get<Office[]>('/offices');

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Error getting offices"
            );
        }

        throw new Error("Unexpected error");
    }
}


export async function CreateOfficeApi(data: CreateOfficeRequest) {
    try {
        const response = await api.post<string>('/offices', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.message ||
                "Error while creating office";

            throw new Error(message);
        }

        throw new Error("Unexpected error");
    }
}