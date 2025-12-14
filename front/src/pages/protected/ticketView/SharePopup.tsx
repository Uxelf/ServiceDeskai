import type React from "react";
import { useState } from "react";
import { ShareTicketApi } from "../../../services/tickets.service";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";

interface Props{
    ticketId: string;
    onEmailSent: () => void;
}

export default function SharePopup({ticketId, onEmailSent} : Props){
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        ShareTicketApi(ticketId, email)
        .then(() => {
            setLoading(false);
            onEmailSent();
        })
        .catch((err) => {
            setLoading(false);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Error sending email");
            }
        })
    };

    return (
        <div className="absolute w-full h-full inset-0 z-10 bg-app-background/80 backdrop-blur-md flex">
            <form
                className="border border-app-background-secondary rounded-sm bg-app-background p-6 m-auto w-80"
                onSubmit={handleSubmit}
            >
                <h2 className="text-lg font-semibold mb-4">Share Ticket</h2>
                <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                error={error}
                placeholder="Enter email"
                />
                <div className="flex gap-4 mt-4">
                <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-500/50 w-full"
                    disabled={loading}
                    onClick={onEmailSent}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </Button>
                </div>
            </form>
        </div>
    )
}