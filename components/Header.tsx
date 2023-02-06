import { SITE_TITLE } from "@/constants/values";
import AuthContext from "@/contexts/auth-context";
import Popup from "@/layouts/Popup";
import Link from "next/link";
import { useCallback, useContext, useMemo, useState } from "react";
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

  const userName = useMemo(
    () => (user ? user.username + "#" + user.discriminator : ""),
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
            <div className="flex flex-row items-center gap-4 animate-fade-in-fwd">
              {userName}
              <Avatar
                src={user.avatarUrl}
                width={40}
                height={40}
                alt={userName}
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
        <div className="w-72 h-72 p-4">
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
