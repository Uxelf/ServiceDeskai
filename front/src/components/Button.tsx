import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  
  return (
    <button
      className={`text-app-white rounded-sm font-semibold transition-colors 
        bg-app-highlight hover:bg-app-highlight/50 disabled:bg-app-background-secondary py-2 px-4
        cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
