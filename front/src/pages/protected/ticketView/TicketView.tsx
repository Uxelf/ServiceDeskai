
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Ticket } from "../../../types/ticket.types";

export default function TicketView(){
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("id"); // asume ?id=123

  useEffect(() => {
    if (!ticketId) {
      setError("Empty Ticket ID.");
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/ticket/${ticketId}`);
        if (!res.ok) throw new Error("Error al obtener el ticket");
        const data: Ticket = await res.json();
        setTicket(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) return <p className="text-gray-500">Cargando ticket...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!ticket) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">{ticket.title}</h1>
      <p className="text-gray-600">{ticket.description}</p>

      {ticket.imageUrl && (
        <img
          src={ticket.imageUrl}
          alt={ticket.title}
          className="w-full max-h-96 object-cover rounded-md"
        />
      )}

      <div className="flex justify-between text-sm text-gray-500">
        <span>ID: {ticket.id}</span>
        <span>Office: {ticket.office}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Status: {ticket.status}</span>
        <span>Author: {ticket.author || "N/A"}</span>
        <span>Assigned: {ticket.assigned || "N/A"}</span>
      </div>
    </div>
  );
};
