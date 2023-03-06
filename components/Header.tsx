import { SITE_TITLE } from "@/constants/values";
import AuthContext from "@/contexts/auth-context";
import Popup from "@/layouts/Popup";
import Link from "next/link";
import { useCallback, useContext, useMemo, useState } from "react";
import Logo from "./assets/Logo";
import Avatar from "./Avatar";
import { BorderButton, InvertBorderButton } from "./buttons";

export default function Header() {
  const [popup, setPopup] = useState<"none" | "user">("none");
  const hidePopup = useCallback(() => {
    setPopup("none");
  }, []);
  const showUser = useCallback(() => {
    setPopup("user");
  }, []);
  const { pending, user } = useContext(AuthContext);

  return (
    <header className="h-14 bg-gray-800 text-white">
      <div className="container mx-auto flex h-full flex-row items-center px-4">
        <div className="w-full">
          <Link href="/" className="text-4xl ">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-row items-center px-8">
          {pending ? null : user ? (
            <div className="flex animate-fade-in-fwd flex-row items-center gap-4">
              {user.name}
              <Avatar
                src={user.avatarUrl}
                width={40}
                height={40}
                alt={user.name}
                onClick={showUser}
              />
            </div>
          ) : (
            <Link href="/api/auth/signin" prefetch={false}>
              <InvertBorderButton>Login</InvertBorderButton>
            </Link>
          )}
        </div>
      </div>
      <Popup show={popup !== "none"} onDismiss={hidePopup}>
        <div className="h-72 w-72 p-4">
          <div className="flex items-center">
            <Link href="/api/auth/signout" prefetch={false} onClick={hidePopup}>
              <InvertBorderButton>ログアウト</InvertBorderButton>
            </Link>
          </div>
        </div>
      </Popup>
    </header>
  );
}
