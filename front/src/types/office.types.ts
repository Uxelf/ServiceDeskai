export interface Office {
    _id: string,
    name: string,
    latitude: number,
    longitude: number,
}

export interface CreateOfficeRequest {
    name: string,
    location: string
}