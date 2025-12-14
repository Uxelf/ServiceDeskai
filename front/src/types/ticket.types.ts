export interface Ticket {
    _id: string,
    status: "open" | "assigned" | "in progress" | "closed",
    office: string,
    title: string,
    description: string,
    author?: string,
    assigned?: string,
    imageUrl?: string,
    createdAt: Date
}

export interface UploadTicketRequest {
    office: string;
    image: File | null;
}

export interface UploadTicketResponse {
    message: string,
}