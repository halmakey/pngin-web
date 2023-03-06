import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 bg-white p-4 text-gray-800">
      <div className="container mx-auto text-gray-800">{children}</div>
    </main>
  );
}
