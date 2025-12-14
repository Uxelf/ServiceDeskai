import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function Create(){

    const navigator = useNavigate();

    return (
        <div className="absolute inset-0 p-4 w-full h-full flex flex-col gap-8">
            <h1 className="pb-4">Create</h1>
                <Button onClick={() => navigator('/create/user')}>Create user</Button>
                <div className="border-b border-app-background-secondary"></div>
                <Button onClick={() => navigator('/create/office')}>Create office</Button>
        </div>
    )
}