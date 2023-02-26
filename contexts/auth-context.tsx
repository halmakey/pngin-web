import { useAsyncCallback } from "@/hooks/useAsyncCallback";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { apiGetMe } from "@/utils/api-client";
import { fail } from "@/utils/functions";
import { UserPayload } from "@/utils/token";
import { createContext, ReactNode, useMemo, useState } from "react";

interface AuthContext {
  pending: boolean;
  user?: UserPayload;
  refresh(): Promise<UserPayload | undefined>;
}

const AuthContext = createContext<AuthContext>({
  pending: true,
  refresh: fail("Use AuthContextProvider"),
});
export default AuthContext;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload>();

  const { pending: pendingGetMe, call: refresh } =
    useAsyncCallback(async () => {
      const user = await apiGetMe().catch(() => undefined);
      setUser(user);
      return user;
    }, []);

  const { pending: pendingInitialize } = useAsyncEffect(async () => {
    await refresh();
  }, []);

  const value = useMemo(
    () => ({
      pending: pendingInitialize || pendingGetMe,
      user,
      refresh,
    }),
    [pendingGetMe, pendingInitialize, refresh, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
