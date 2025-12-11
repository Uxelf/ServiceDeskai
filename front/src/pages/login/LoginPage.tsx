import { useState } from "react";
import FormInput from "../../components/FormInput";
import ThemeToggle from "../../components/ThemeToggle";
import LoginForm from "../../features/login/LoginForm";

export function LoginPage() {
  return <div className="w-dvw h-dvh flex">
    <LoginForm/>
  </div>;
}

export default LoginPage;
