import { useEffect, useState } from "react"
import TicketCard from "./TicketCard";
import type { Ticket } from "../../../types/ticket.types";
import { GetAllTicketsApi, GetDeskTicketsApi, GetUserTicketsApi } from "../../../services/tickets.service";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export default function TicketsList(){

    const [selectedStatus, setSelectedStatus] = useState<"open" | "closed">("open");
    const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
    const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState("");
    const userRole = useSelector((state: RootState) => state.auth.user?.role);

    useEffect(() => {
        let getTickets = GetUserTicketsApi;
        if (userRole === "desk")
            getTickets = GetDeskTicketsApi;
        else if (userRole === "admin")
            getTickets = GetAllTicketsApi;

        getTickets()
        .then((data) => {
            setOpenTickets(data.filter(ticket => ticket.status != "closed"))
            setClosedTickets(data.filter(ticket => ticket.status === "closed"))
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message);
        })
    },
    []);

    useEffect(() => {
        setTickets([...openTickets]);
    }, [openTickets, closedTickets])

    function handleChooseTicketsTypes(status: "open" | "closed"){
        if (status === "open")
            setTickets([...openTickets]);
        else
            setTickets([...closedTickets]);
        setSelectedStatus(status);
    }

    return (
        <div className="absolute w-full h-full flex flex-col px-4 pt-2">

            {error && <p className="text-red-500">{error}</p>}
            {!error &&
            <>
            <div className="flex py-2 border-b border-app-background-secondary">
                <div className={`flex-1/2 text-2xl text-center py-2 rounded-sm hover:bg-app-background-secondary transition-all cursor-pointer
                    ${selectedStatus === "open" ? "text-app-primary font-semibold" : "text-app-secondary font-normal"}`}
                    onClick={() => handleChooseTicketsTypes("open")}>Open</div>
                <div className={`flex-1/2 text-2xl text-center py-2 rounded-sm hover:bg-app-background-secondary transition-all cursor-pointer
                    ${selectedStatus === "closed" ? "text-app-primary font-semibold" : "text-app-secondary font-normal"}`}
                    onClick={() => handleChooseTicketsTypes("closed")}>Closed</div>
            </div>

            <div className="flex-1 relative">
                <div className="absolute inset-0 flex flex-col h-full overflow-auto px-4">
                    {tickets.map((ticket, index) => (
                        <TicketCard 
                        key={'ticket_' + ticket._id} 
                        id={ticket._id}
                        title={ticket.title}
                        status={ticket.status}
                        isLast={index === tickets.length - 1}/>
                    ))}
                </div>
            </div>
            </>
            }
        </div>
    )
}