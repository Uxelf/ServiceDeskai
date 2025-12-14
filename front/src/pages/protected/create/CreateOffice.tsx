import { useState } from "react";
import { z } from "zod";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CreateOfficeApi } from "../../../services/offices.service";

const userSchema = z.object({
    name: z.string().min(1, "Name required"),
    location: z.string().min(1, "Location required")
}).strict();

type OfficeFormData = z.infer<typeof userSchema>;

type Errors = Partial<Record<keyof OfficeFormData, string>>;

export default function CreateOffice() {
  const [form, setForm] = useState<OfficeFormData>({
    name: "",
    location: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [creationError, setCreationError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const updateField = <K extends keyof OfficeFormData>(
    key: K,
    value: OfficeFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({
      ...form
    });

    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof OfficeFormData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true)
    setCreationError("")
    
    CreateOfficeApi(form)
    .then(() => navigator("/create"))
    .catch((error) => {setCreationError(error.message); setLoading(false)});
  };

  return (
    <div className="absolute inset-0 p-4 w-full h-full flex flex-col gap-8">
            <h1 className="pb-4">Create</h1>
        <form
        onSubmit={handleSubmit}
        className=""
        >
            <FormInput
                label="Name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
            />

            <FormInput
                label="Address"
                value={form.location}
                onChange={(v) => updateField("location", v)}
                error={errors.location}
            />
        <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading}
        >
            Create office
        </Button>
        {creationError && 
            <p className="w-full text-center mt-2 text-sm text-red-500">{creationError}</p>
        }
        </form>
    </div>
  );
}
