import { createContext, useContext, useState, useEffect } from "react";
import type { AuthObject } from "../types";

type AuthProviderProps = {
    children: React.ReactNode
}

export type AuthContextType = {
    auth: AuthObject
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({children}: AuthProviderProps){
    const [auth, setAuth] = useState(null)

    return <AuthContext.Provider value={{auth}}>
        {children}
    </AuthContext.Provider>
}