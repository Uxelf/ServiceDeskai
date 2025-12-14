import React, { useState } from "react";
import Button from "../../../components/Button";
import OfficeSelector from "../../../components/OfficeSelector";
import PhotoUpload from "../../../components/PhotoUpload";
import { UploadTicketApi } from "../../../services/tickets.service";
import { useNavigate } from "react-router-dom";

export default function UploadPage(){

    const [selectedOfficeId, setSelectedOfficeId] = useState<string>("")
    const [photo, setPhoto] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    
    const navigator = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!photo || !selectedOfficeId) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("office", selectedOfficeId);
        formData.append("image", photo);

        UploadTicketApi(formData)
        .then(() => navigator("/tickets"))
        .catch((error) => {
            console.error(error);
            setUploading(false);
        });
    }

    return (
        <div className="absolute w-full h-full flex flex-col px-4 pt-2">
            <h1>New ticket</h1>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-8 p-4">

                <OfficeSelector onChange={setSelectedOfficeId}></OfficeSelector>
                <div className="flex flex-1 w-full relative">
                    <PhotoUpload name="UploadPhoto" onFileSelect={setPhoto}></PhotoUpload>
                </div>
                <Button type="submit" disabled={uploading || !photo || !selectedOfficeId}>Send</Button>
            </form>
        </div>
    )
}