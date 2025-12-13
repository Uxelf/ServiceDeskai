import React, { useState } from "react";
import FormInput from "../../../components/FormInput";

export default function TicketAddMessage(){

    const [message, setMessage] = useState("");

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
    }

    return (
        <form
            onSubmit={ handleSubmit}>
                <FormInput
                    type="text"
                    value={message}
                    placeholder="Add a message"
                    onChange={setMessage}
                    />
        </form>
    )
}