import { SITE_TITLE } from "@/constants/values";
import Link from "next/link";

export default function Header() {
  return (
    <header className="text-white bg-gray-800">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-4xl ">
          {SITE_TITLE}
        </Link>
      </div>
    </header>
  );
}
