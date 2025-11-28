import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { AuthObject } from "../types";
import { axiosPublic } from "../api/axiosPublic";

type AuthProviderProps = {
    children: React.ReactNode
}

export type AuthContextType = {
    auth: AuthObject | null,
    refresh: () => Promise<AuthObject | undefined>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({children}: AuthProviderProps){
    const [auth, setAuth] = useState(null)

    const refresh = useCallback(async () => {
        try{
            const response = await axiosPublic.get("/auth/refresh")
            const authObject = response.data as AuthObject
            return authObject
        }catch(err){
            console.log(err)
            return undefined
        }
    }, [auth])

    return <AuthContext.Provider value={{auth, refresh}}>
        {children}
    </AuthContext.Provider>
}