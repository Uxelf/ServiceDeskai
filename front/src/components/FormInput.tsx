import { useState } from "react";

interface FormInputProps {
  label?: string;
  type?: "text" | "password" | "email";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  error
}: FormInputProps) {


  return (
    <div className="flex flex-col mb-4">
      {label && 
      <label className="mb-1 font-semibold">{label}</label>}

      <div className="">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 rounded-sm ${
            error ? "border border-red-500" : ""
          } bg-app-background-secondary`}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}