import { useContext } from "react";
import { AuthContext } from "@/components/auth-provider"; // import context từ AuthProvider

export function useAuth() {
  return useContext(AuthContext);
}
