import { ReactNode } from "react";

export default function Main({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`container flex flex-1 flex-col p-4 text-gray-800 mx-auto ${className}`}
    >
      {children}
    </main>
  );
}
