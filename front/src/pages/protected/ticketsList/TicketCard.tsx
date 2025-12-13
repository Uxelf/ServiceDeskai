import { NavLink } from "react-router-dom";

interface TicketCardProps {
  id: string;
  title: string;
  status: string;
  isLast?: boolean; 
}

export default function TicketCard({id, title, status, isLast} : TicketCardProps){
    const statusClasses: Record<string, string> = {
        "open": "text-app-secondary",
        "assigned": "text-app-primary font-semibold",
        "in progress": "text-app-highlight font-semibold",
        "closed": "text-app-primary",
    };

    return (
        <NavLink className={`flex cursor-pointer px-4 py-2 hover:bg-app-background-secondary/40 transition-all ${!isLast? "border-b border-app-background-secondary" : ""}`}
            to={`/tickets/${id}`}>
            <div className="flex flex-col w-full">
                <div className="">{id} - {title}</div>
                <div className={`text-sm ${statusClasses[status]}`}>{status}</div>
            </div>
            {/* <div className="my-auto cursor-pointer p-2 rounded-sm border-app-background-secondary hover:bg-app-background-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </div> */}
        </NavLink>
    )
}