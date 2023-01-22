import { SITE_TITLE } from "@/constants/values";
import Link from "next/link";

export default function Header() {
  return (
    <header className="text-white bg-gray-800 h-14">
      <div className="container mx-auto h-full px-4 flex flex-row items-center">
        <Link href="/" className="text-4xl ">
          {SITE_TITLE}
        </Link>
      </div>
    </header>
  );
}
