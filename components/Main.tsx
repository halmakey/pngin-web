import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="text-gray-800 bg-white p-4 flex-1">
      <div className="container mx-auto text-gray-800">{children}</div>
    </main>
  );
}
