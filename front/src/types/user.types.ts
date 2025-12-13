export interface UserUpdateRequest {
    name?: string,
    surname?: string,
    office?: string
}

export interface UserUpdateResponse {
    username: string,
    role: string,
    office: string,
    name?: string,
    surname?: string
}