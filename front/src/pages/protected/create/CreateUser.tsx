import { useState } from "react";
import { z } from "zod";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";
import { CreateUserApi } from "../../../services/users.services";
import { useNavigate } from "react-router-dom";

// Schema (idealmente importado desde un archivo compartido)
const userSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
  role: z.enum(["standard", "desk"]),
  name: z.string().min(1, "Name can't be 1 character").optional(),
  surname: z.string().min(1, "Surname can't be 1 character").optional()
}).strict();

type UserFormData = z.infer<typeof userSchema>;

type Errors = Partial<Record<keyof UserFormData, string>>;

export default function CreateUser() {
  const [form, setForm] = useState<UserFormData>({
    username: "",
    password: "",
    role: "standard",
    name: "",
    surname: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [creationError, setCreationError] = useState("");
  const navigator = useNavigate();

  const updateField = <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({
      ...form,
      name: form.name || undefined,
      surname: form.surname || undefined
    });

    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof UserFormData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    
    CreateUserApi(form)
    .then(() => navigator("/create"))
    .catch((error) => {setCreationError(error.message)});
  };

  return (
    <div className="absolute inset-0 p-4 w-full h-full flex flex-col gap-8">
            <h1 className="pb-4">Create</h1>
        <form
        onSubmit={handleSubmit}
        className=""
        >
            <FormInput
                label="Username"
                value={form.username}
                onChange={(v) => updateField("username", v)}
                error={errors.username}
            />

            <FormInput
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => updateField("password", v)}
                error={errors.password}
            />

            <div className="mb-4">
                <label className="text-sm font-medium">Role</label>
                <select
                className="block w-full rounded-md bg-app-background border border-app-background-secondary py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value as UserFormData["role"])}
                >
                    <option value="standard">Standard</option>
                    <option value="desk">Desk</option>
                </select>
                {errors.role && (
                <p className="text-xs text-red-500">{errors.role}</p>
                )}
            </div>

            <FormInput
                label="Name (optional)"
                value={form.name ?? ""}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
            />

            <FormInput
                label="Surname (optional)"
                value={form.surname ?? ""}
                onChange={(v) => updateField("surname", v)}
                error={errors.surname}
            />

        <Button
            type="submit"
            className="w-full mt-2"
        >
            Create user
        </Button>
        {creationError && 
            <p className="w-full text-center mt-2 text-sm text-red-500">{creationError}</p>
        }
        </form>
    </div>
  );
}
