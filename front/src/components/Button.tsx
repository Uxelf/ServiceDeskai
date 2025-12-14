import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonStyle?: "primary" | "secondary", 
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  buttonStyle = "primary",
  ...props
}) => {
  
  const styles = {
    primary: "text-app-white bg-app-highlight hover:bg-app-highlight/50 disabled:bg-app-background-secondary px-4",
    secondary: "text-app-primary hover:bg-app-background-secondary underline px-1",
  }

  return (
    <button
      className={`font-semibold transition-colors rounded-sm py-2
        cursor-pointer ${className} ${styles[buttonStyle]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
