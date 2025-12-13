export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    message: string,
    username: string,
    role: string,
    prefferedOffice: string
}
