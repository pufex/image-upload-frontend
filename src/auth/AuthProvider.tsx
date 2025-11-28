import { createContext, useContext, useState, useEffect } from "react";
import type { AuthObject } from "../types";

type AuthProviderProps = {
    children: React.ReactNode
}

export type AuthContextType = {
    auth: AuthObject
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if(auth){
        return auth;
    }else{
        throw new Error("useAuth() used outside its provider.")
    }
}

export default function AuthProvider({children}: AuthProviderProps){
    const [auth, setAuth] = useState(null)

    return <AuthContext.Provider value={{auth}}>
        {children}
    </AuthContext.Provider>
}