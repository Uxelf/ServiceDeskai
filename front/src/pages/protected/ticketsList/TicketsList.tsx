import { useEffect, useState } from "react"
import TicketCard from "./TicketCard";
import type { Ticket } from "../../../types/ticket.types";

export default function TicketsList(){

    const [selectedStatus, setSelectedStatus] = useState<"open" | "closed">("open");
    const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
    const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        
        let openTickets : Ticket[] = [];
        for (let i = 0; i < 20; i++){
            let openTicket : Ticket = {id: i, description: "", imageUrl: "", office: "", status: "open", title: "Title"};
            openTickets.push(openTicket);
        }

        openTickets[0].status = "in progress";
        openTickets[1].status = "assigned";
        openTickets[2].status = "assigned";

        let closedTickets : Ticket[] = [];
        for (let i = 0; i < 10; i++){
            let closedTicket : Ticket = {id: i, description: "", imageUrl: "", office: "", status: "closed", title: "Title"};
            closedTickets.push(closedTicket);
        }

        setOpenTickets(openTickets);
        setClosedTickets(closedTickets);
        setTickets(openTickets);
    },
    []);

    function handleChooseTicketsTypes(status: "open" | "closed"){
        if (status === "open")
            setTickets([...openTickets]);
        else
            setTickets([...closedTickets]);
        setSelectedStatus(status);
    }

    return (
        <div className="absolute w-full h-full flex flex-col px-4 pt-2">

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
                        key={'ticket_' + ticket.id} 
                        id={ticket.id}
                        title={ticket.title}
                        status={ticket.status}
                        isLast={index === tickets.length - 1}/>
                    ))}
                </div>
            </div>
        </div>
    )
}