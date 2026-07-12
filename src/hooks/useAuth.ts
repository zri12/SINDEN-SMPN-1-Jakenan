import { useCallback, useEffect, useState } from "react";
import type { AuthUser, LoginPayload } from "@/types/auth";
import { getCurrentProfile, getCurrentUser, login as loginService, logout as logoutService } from "@/features/auth/authService";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    getCurrentProfile().then((profile) => {
      setUser(profile);
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (payload: LoginPayload) => {
    const loggedIn = await loginService(payload);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const signOut = useCallback(() => {
    logoutService();
    setUser(null);
  }, []);

  return { user, isLoading, signIn, signOut };
}
