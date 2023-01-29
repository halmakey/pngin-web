import { useAsyncCallback } from "@/hooks/useAsyncCallback";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { ApiUser } from "@/types/api/user";
import { apiGetMe } from "@/utils/api";
import { fail } from "@/utils/functions";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContext {
  pending: boolean;
  user?: ApiUser;
  refresh(): Promise<ApiUser | undefined>;
}

const AuthContext = createContext<AuthContext>({
  pending: true,
  refresh: fail("Use AuthContextProvider"),
});
export default AuthContext;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser>();

  const { pending: pendingGetMe, call: refresh } =
    useAsyncCallback(async () => {
      const user = await apiGetMe();
      setUser(user);
      return user;
    }, []);

  const { pending: pendingInitialize } = useAsyncEffect(async () => {
    await refresh();
  }, []);

  console.log({ pendingGetMe, pendingInitialize });

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
