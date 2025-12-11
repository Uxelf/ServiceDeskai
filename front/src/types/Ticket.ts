export interface Ticket {
    id: number,
    status: "open" | "assigned" | "in progress" | "closed",
    office: string,
    title: string,
    description: string,
    imageUrl: string,
    author?: string,
    assigned?: string,
}