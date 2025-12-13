import { useState, type ChangeEvent } from "react";

// components/PhotoUpload.tsx
interface Props {
  name: string;
  onFileSelect: (file: File | null) => void;
}

export default function PhotoUpload({ name, onFileSelect }: Props){
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col absolute inset-0 w-full h-full items-center space-y-2">
      <label
        htmlFor={name}
        className="font-semibold cursor-pointer bg-app-highlight text-app-white px-4 py-2 rounded hover:bg-app-highlight/50 transition"
      >
        Upload photo
      </label>
      <input
        type="file"
        id={name}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="max-w-full max-h-full object-cover rounded border border-app-background-secondary"
        />
      )}
    </div>
  );
};