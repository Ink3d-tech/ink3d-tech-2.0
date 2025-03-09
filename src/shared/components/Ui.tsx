import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export function Button({ variant = "default", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${
        variant === "destructive" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    />
  );
}
