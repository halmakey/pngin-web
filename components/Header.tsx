import { SITE_TITLE } from "@/constants/values";
import AuthContext from "@/contexts/auth-context";
import Link from "next/link";
import { useContext, useMemo } from "react";
import Avatar from "./Avatar";
import { BorderButton, InvertBorderButton } from "./buttons";

export default function Header() {
  const { pending, user } = useContext(AuthContext);

  const userName = useMemo(
    () => user && user.username + "#" + user.discriminator,
    [user]
  );
  return (
    <header className="text-white bg-gray-800 h-14">
      <div className="container mx-auto h-full px-4 flex flex-row items-center">
        <div className="w-full">
          <Link href="/" className="text-4xl ">
            {SITE_TITLE}
          </Link>
        </div>
        <div className="px-8 flex flex-row items-center">
          {pending ? null : user ? (
            <div className="flex flex-row items-center gap-4">
              {userName}
              <Avatar
                src={user.avatarUrl || "/anonymous.svg"}
                width={40}
                height={40}
                alt={userName}
              />
            </div>
          ) : (
            <Link href="/auth?signin" prefetch={false}>
              <InvertBorderButton>Login</InvertBorderButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
