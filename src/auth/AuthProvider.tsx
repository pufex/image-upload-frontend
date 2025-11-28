import { createContext, useState, useEffect, useCallback } from "react";
import type { AuthObject } from "../types";
import { axiosPublic } from "../api/axiosPublic";
import LoadingPage from "../layouts/LoadingPage";

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthObjectState = AuthObject | null

export type AuthContextType = {
    auth: AuthObjectState,
    refresh: () => Promise<AuthObject | undefined>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({children}: AuthProviderProps){
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState<AuthObjectState>(null)

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

    useEffect(() => {
        const getAuthObject = async () => {
            setLoading(true)
            try{
                const authObject = await refresh()
                setAuth(authObject ? authObject : null)
            }catch(err){
                console.log(err)
                setAuth(null)
            }finally{
                setLoading(false)
            }
        }

        getAuthObject()
    }, [])

    return <AuthContext.Provider value={{auth, refresh}}>
        {
            loading
                ? <LoadingPage />
                : children
        }
    </AuthContext.Provider>
}