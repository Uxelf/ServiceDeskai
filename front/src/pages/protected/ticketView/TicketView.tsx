
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Ticket } from "../../../types/ticket.types";
import { GetTicketByIdApi, UpdateTicketStatusApi } from "../../../services/tickets.service";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Button from "../../../components/Button";
import type { Office } from "../../../types/office.types";
import { GetOffices } from "../../../services/offices.service";
import SharePopup from "./SharePopup";

export default function TicketView(){
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const [offices, setOffices] = useState<Office[]>([]);
  const [ticketOfficeName, setTicketOfficeName] = useState<string>("");
  const [updatingTicket, setUpdatingTicket] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      setError("Empty Ticket ID.");
      setLoading(false);
      return;
    }

    GetTicketByIdApi(id)
    .then(data => {
      setTicket(data)
    });

    GetOffices()
    .then((data) => setOffices(data))
    .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (ticket && offices){
      setLoading(false);
      const office = offices.find((office) => office._id == ticket.office);
      if (office)
        setTicketOfficeName(office?.name);
    }
  }, [ticket, offices])

  const statusClasses: Record<string, string> = {
        "open": "text-app-primary",
        "assigned": "text-app-primary",
        "in progress": "text-app-highlight",
        "closed": "text-app-primary",
    };

  if (loading) return <p className="text-app-secondary">Loading ticket...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!ticket) return null;

  const handleDeskButton = () => {
    if (userRole !== "desk")
      return;
    let updatedStatus: "in progress" | "closed" = "in progress";
    if (ticket.status === "in progress"){
      updatedStatus = "closed";
    }
    setUpdatingTicket(true);
    UpdateTicketStatusApi(ticket._id, updatedStatus)
    .then(() => {
      setUpdatingTicket(false);
      GetTicketByIdApi(ticket._id)
      .then(data => {
        setTicket(data)
      });
    })
    .catch((error) => {setError(error.error)});    
  }

  const toggleShare = () => {
    setShareOpen(!shareOpen);
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 pt-4 h-full absolute inset-0">
      {shareOpen && <SharePopup ticketId={ticket._id} onEmailSent={toggleShare}></SharePopup>}
      <div className="flex flex-col pb-4 border-b border-app-background-secondary">
        <h1>Ticket - {ticket.title}</h1>
        <h2 className="">id: {ticket._id}</h2>
        <Button className="w-fit mt-2 flex gap-2" buttonStyle="secondary" onClick={toggleShare}>Share 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
          </svg>
        </Button>
      </div>
      <div className="flex-1 relative">
        <div className="flex flex-col h-full gap-4 p-2 overflow-auto absolute inset-0">
          <div>
            <h3>Status</h3>
            <div className={`text-sm ${statusClasses[ticket.status]}`}>{ticket.status}</div>
          </div>
          <div>
            <h3>Office</h3>
            <div>{ticketOfficeName}</div>
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
          <div className="mx-auto">
            <img
              src={`/ticketImages/${ticket.imageUrl}`}
              alt="Preview"
              className="max-w-full max-h-full object-cover rounded border border-app-background-secondary"
            />
          </div>
          {userRole === "desk" && ticket.status !== "closed" && 
            <Button onClick={handleDeskButton} disabled={updatingTicket}>{ticket.status === "assigned" ? "Start work" : "Close ticket"}</Button>
          }
        </div>
      
        
      </div>
    </div>
  );
};
