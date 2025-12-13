export interface Message {
    author: string,
    content: string,
    date: string,
}

export interface Ticket {
    _id: string,
    status: "open" | "assigned" | "in progress" | "closed",
    office: string,
    title: string,
    description: string,
    imageUrl: string,
    author?: string,
    assigned?: string,
    chats?: Message[]
}