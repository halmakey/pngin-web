import Link from "next/link";
import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto text-gray-800 p-4 bg-white">
      {children}
    </main>
  );
}
