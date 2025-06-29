import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@repo/store";
import Loading from "./ui/Loading";
import { useSession } from "../lib/auth-client";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { setUser, user } = useUserStore();

  useEffect(() => {
    console.log("Session data:", session);

    if (!isPending && !session) {
      router.push("/login");
      return;
    }
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session, isPending]);

  if (isPending) {
    return <Loading />;
  }
  return <>{children}</>;
}
