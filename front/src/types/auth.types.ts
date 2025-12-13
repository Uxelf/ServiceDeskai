export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    username: string,
    role: string,
    office: string,
    name?: string,
    surname?: string
}

export interface LogoutRequest {
}

export interface LogoutResponse {
    message: string
}