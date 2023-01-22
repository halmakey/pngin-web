import { ReactNode } from "react";

export function BorderButton({ children }: { children: ReactNode }) {
  return (
    <button className="transition border border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white active:bg-gray-600">
      {children}
    </button>
  );
}
