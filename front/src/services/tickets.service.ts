import axios from "axios";
import { type Ticket } from "../types/ticket.types";
import api from "./api";


export async function getTicketsApi() {
    try {
        const response = await api.get<Ticket[]>('/tickets/my-tickets');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Error getting tickets"
            );
        }

        throw new Error("Unexpected error");
    }
}

export async function getTicketByIdApi(id: string) {
    try {
        const response = await api.get<Ticket>(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Error getting ticket"
            );
        }

        throw new Error("Unexpected error");
    }
}

//export async function AddChatMessageToTicketApi(id: string, )