import axios from "axios";
import type { Office } from "../types/office.types";
import api from "./api";

export async function fetchOffices(): Promise<Office[]> {
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