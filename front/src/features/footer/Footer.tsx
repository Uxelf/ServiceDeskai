import { NavLink } from "react-router-dom"

export default function Footer(){
    return (
        <footer className="w-full border-t border-app-background-secondary">
            <nav className="flex flex-row justify-center gap-8 py-2">
                <NavLink className="flex flex-col min-w-24 w-fit p-4 rounded-sm cursor-pointer transition-all 
                    bg-app-background hover:bg-app-background-secondary" 
                    to="/tickets">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                    <div className="w-full text-center">Tickets</div>
                </NavLink>
                <NavLink className="flex flex-col min-w-24 w-fit p-4 rounded-sm cursor-pointer transition-all 
                    bg-app-background hover:bg-app-background-secondary" 
                    to="/upload">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div className="w-full text-center">Upload</div>
                </NavLink>
                <NavLink className="flex flex-col min-w-24 w-fit p-4 rounded-sm cursor-pointer transition-all 
                    bg-app-background hover:bg-app-background-secondary" 
                    to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <div className="w-full text-center">Profile</div>
                </NavLink>
            </nav>
        </footer>
    )
}