import { SITE_TITLE } from "@/constants/values";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white bg-gray-800 h-80">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-lg">
          {SITE_TITLE}
        </Link>
      </div>
    </footer>
  );
}
