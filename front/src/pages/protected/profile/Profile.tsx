import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../../store/store"
import type React from "react"
import FormInput from "../../../components/FormInput"
import { useState } from "react"
import OfficeSelector from "../../../components/OfficeSelector"
import ThemeToggle from "../../../components/ThemeToggle"
import { updateProfile } from "../../../store/thunk/updateProfile.thunk"
import Button from "../../../components/Button"
import { logout } from "../../../store/thunk/logout.thunk"


export default function Profile(){

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState(user?.name || "");
    const [surname, setSurname] = useState(user?.surname || "");
    const [selectedOfficeId, setSelectedOfficeId] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfile({name, surname, office: selectedOfficeId}))
    }

    const handleLogout = () => {
        dispatch(logout({}))
    }

    return (
        <div className="absolute inset-0 p-4 w-full h-full flex flex-col overflow-auto">
            <h1 className="pb-4">Profile</h1>
            <h2>{user?.username}</h2>
            <div>Role: {user?.role}</div>
            <form
            onSubmit={handleSubmit}
            className="mb-8 mt-4 pb-4 flex flex-col border-b border-app-background-secondary"
            >
                <FormInput
                label="Name"
                type="text"
                value={name}
                onChange={setName}
                />
                <FormInput
                label="Surname"
                type="text"
                value={surname}
                onChange={setSurname}
                />
                <OfficeSelector onChange={setSelectedOfficeId}/>
                <Button className="mx-auto my-4">Update</Button>
            </form>
            <ThemeToggle/>
            <div className="my-8 border-t border-app-background-secondary w-full"/>
            <Button onClick={handleLogout}>Log out</Button>
          
        </div>
    )
}