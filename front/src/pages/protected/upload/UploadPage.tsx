import React, { useState } from "react";
import Button from "../../../components/Button";
import OfficeSelector from "../../../components/OfficeSelector";
import PhotoUpload from "../../../components/PhotoUpload";

export default function UploadPage(){

    const [selectedOfficeId, setSelectedOfficeId] = useState<string>("")
    const [photo, setPhoto] = useState<File | null>(null);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Selected:", selectedOfficeId)
        if (photo)
            console.log("Hay foto", photo);
        else
            console.log("No hay foto");
    }

    return (
        <div className="absolute w-full h-full flex flex-col px-4 pt-2">
            <h1>New ticket</h1>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-8 p-4">

                <OfficeSelector onChange={setSelectedOfficeId}></OfficeSelector>
                <div className="flex flex-1 w-full relative">
                    <PhotoUpload name="UploadPhoto" onFileSelect={setPhoto}></PhotoUpload>
                </div>
                <Button className="" type="submit">Send</Button>
            </form>
        </div>
    )
}