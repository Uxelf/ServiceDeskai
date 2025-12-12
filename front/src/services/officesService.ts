import type { Office } from "../types/Office";

export async function fetchOffices(): Promise<Office[]> {
    const res = await fetch(`${window.location.protocol}//${window.location.hostname}:3000/api/offices`);

    if (!res.ok) {
        throw new Error("Error getting offices");
    }

    const data = await res.json();
    return data as Office[];
}