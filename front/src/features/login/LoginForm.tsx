import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

export default function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación simple
        const newErrors = { username: "", password: "" };
        if (!password) newErrors.password = "La contraseña es obligatoria";

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
        // Aquí iría la lógica real de login
            console.log("Login:", { username, password });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md m-auto p-8 flex flex-col">
                <h1 className="w-full text-center text-2xl font-semibold mb-6">Log in</h1>
                <FormInput
                    label="Username"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={setUsername}
                    error={errors.username}
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={setPassword}
                    error={errors.password}
                />
                <Button className="mx-auto">Log in</Button>
            </form>
    )
}