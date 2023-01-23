import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
}

export function BorderButton({ children }: ButtonProps) {
  return (
    <button className="transition border border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white active:bg-gray-600 active:border-gray-600">
      {children}
    </button>
  );
}

export function InvertBorderButton({ children }: ButtonProps) {
  return (
    <button className="transition border border-white px-4 py-2 hover:bg-white hover:text-gray-800 active:bg-gray-400 active:border-gray-400">
      {children}
    </button>
  );
}
