import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../db/supabaseClient";

const AuthContext = createContext({
  session: null
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export const useGetAuth = () => {
  const { session } = useContext(AuthContext);
  return session;
}