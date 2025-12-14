import { useEffect, useMemo, useState } from "react";
import type { Office } from "../types/office.types";
import { GetOffices } from "../services/offices.service";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props {
    placeholder?: string;
    onChange: (officeId: string) => void;
}

export default function OfficeSelector({ onChange }: Props) {
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);

    const prefOffice = useSelector((state: RootState) => state.auth.user?.office);

    
    useEffect(() => {
        GetOffices()
            .then((data) => setOffices(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        });
    }, []);

    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
    };

    const sortedOffices = useMemo(() => {
    return [...offices].sort((a, b) => {
        if (userLocation) {
            const distA = distance(userLocation.lat, userLocation.lon, a.latitude, a.longitude);
            const distB = distance(userLocation.lat, userLocation.lon, b.latitude, b.longitude);
            return distA - distB;
        }
        return a.name.localeCompare(b.name);
    });
}, [offices, userLocation]);

    useEffect(() => {
        if (!loading && sortedOffices.length > 0) {
            const officeToSelect = prefOffice || sortedOffices[0]._id;
            setSelectedOfficeId(officeToSelect);
            onChange(officeToSelect);
        }
    }, [loading, sortedOffices, prefOffice, onChange]);

    if (loading) return <p>Cargando oficinas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col">
            <label className="mb-2 font-semibold">Office</label>
            <select
                className="block w-full rounded-md bg-app-background border border-app-background-secondary py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={selectedOfficeId || ""}
                onChange={(e) => {
                    setSelectedOfficeId(e.target.value);
                    onChange(e.target.value);
                }}
            >
                {sortedOffices.map((office) => (
                    <option key={office._id} value={office._id}>
                        {office.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
