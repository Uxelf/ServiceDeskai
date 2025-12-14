import axios from "axios";
import { type UploadTicketResponse, type Ticket } from "../types/ticket.types";
import api from "./api";


export async function UploadTicketApi(formData: FormData) {
    try {
        const response = await api.post<UploadTicketResponse>('/tickets', formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error uploading ticket"
            );
        }
        throw new Error("Unexpected error");
    }
}

export async function GetUserTicketsApi() {
    try {
        const response = await api.get<Ticket[]>('/tickets/my-tickets');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error getting tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function GetTicketByIdApi(id: string) {
    try {
        const response = await api.get<Ticket>(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error getting ticket"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function GetDeskTicketsApi() {
    try {
        const response = await api.get<Ticket[]>('/tickets/my-desk-tickets');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error getting tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function GetAllTicketsApi() {
    try {
        const response = await api.get<Ticket[]>('/tickets/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error getting tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function UpdateTicketStatusApi(id: string, status: "in progress" | "closed") {
    try {
        const response = await api.patch<string>('/tickets/update-status/' + id, { status: status });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error getting tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function ShareTicketApi(id: string, email: string) {
    try {
        const response = await api.post('/tickets/share/' + id, { email: email });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error || "Error sharing tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

