import type { Message } from "../../../types/ticket.types"

interface Props{
    chats?: Message[]
}

export default function TicketChatHistory({chats} : Props){


    return (
        <div className="flex flex-col">
            {chats && chats.map((chat) => 
                <div className="flex flex-col">
                    <div className="font-bold">{chat.author} - {chat.date}</div>
                    <div>{chat.content}</div>
                </div>
            )}
        </div>
    )
}