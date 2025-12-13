
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Ticket } from "../../../types/ticket.types";
import { getTicketByIdApi } from "../../../services/tickets.service";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Button from "../../../components/Button";
import TicketChatHistory from "./TicketChatHistory";
import TicketAddMessage from "./TicketAddMessage";

export default function TicketView(){
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      setError("Empty Ticket ID.");
      setLoading(false);
      return;
    }

    getTicketByIdApi(id)
    .then(data => {
      setTicket(data)
    }).
    then(_ => {setLoading(false)})
  }, [id]);

  const statusClasses: Record<string, string> = {
        "open": "text-app-primary",
        "assigned": "text-app-primary",
        "in progress": "text-app-highlight",
        "closed": "text-app-primary",
    };

  if (loading) return <p className="text-app-secondary">Cargando ticket...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!ticket) return null;

  const handleDeskButton = () => {
    if (userRole !== "desk")
      return;
    console.log("Change status")
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 pt-4 h-full absolute inset-0">
      <div className="flex flex-col pb-4 border-b border-app-background-secondary">
        <h1>Ticket - {ticket.title}</h1>
        <h2 className="">id: {ticket._id}</h2>
      </div>
      <div className="flex-1 border relative">
        <div className="flex flex-col h-full gap-4 p-2 overflow-auto absolute inset-0">
          <div>
            <h3>Status</h3>
            <div className={`text-sm ${statusClasses[ticket.status]}`}>{ticket.status}</div>
          </div>
          <div>
            <h3>Office</h3>
            <div>{ticket.office}</div>
          </div>
          {userRole === "admin" &&
            <>
              <div>
                <h3>Created by</h3>
                <div>{ticket.author}</div>
              </div>
              <div>
                <h3>Assigned to</h3>
                <div>{ticket.assigned}</div>
              </div>
            </>
          }
          <div>
            <h3>Description</h3>
            <div>{ticket.description}</div>
          </div>
          <div>
            <img
              src={ticket.imageUrl}
              alt="Preview"
              className="max-w-full max-h-full object-cover rounded border border-app-background-secondary"
            />
          </div>
          {userRole === "desk" && 
            <Button onClick={handleDeskButton}>{ticket.status === "assigned" ? "Start work" : "Close ticket"}</Button>
          }
          {ticket.status !== "open" && ticket.status !== "assigned" &&
            <div>
              <h3>Chat</h3>
              <TicketChatHistory chats={ticket.chats}/>
              {ticket.status !== "closed" &&
                <TicketAddMessage />
              }
            </div>
            
          }
        </div>
      
        
      </div>
    </div>
  );
};
