import React, { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/thunk/login.thunk";

export default function LoginForm(){
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {user, loading, error} = useSelector(
        (state: RootState) => state.auth
    )
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [manualError, setManualError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username && !password){
            setManualError("Enter something");
            return;
        }
        setManualError("");
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (user) {
            navigate("/tickets");
        }
    }, [user, navigate]);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md m-auto p-8 flex flex-col relative">
                <h1 className="w-full text-center text-2xl font-semibold mb-6">Log in</h1>
                <FormInput
                    label="Username"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={setUsername}
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={setPassword}
                />
                <Button className="mx-auto" disabled={loading}>Log in</Button>
                {(error || manualError) && <p className="absolute w-full bottom-0 left-0 text-center mt-2 text-red-600">{error? error : manualError}</p>}
        </form>
    )
}