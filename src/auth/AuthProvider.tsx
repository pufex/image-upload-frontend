import { createContext, useState, useEffect, useCallback } from "react";
import type { AuthObject } from "../types";
import { axiosPublic } from "../api/axiosPublic";
import LoadingPage from "../layouts/LoadingPage";
import {z} from "zod"
import { registerSchema } from "../schemas/registerSchema";
import { loginSchema } from "../schemas/loginSchema";

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthObjectState = AuthObject | null

type RegisterFormFields = z.infer<typeof registerSchema>
type LoginFormFields = z.infer<typeof loginSchema>

export type AuthContextType = {
    auth: AuthObjectState,
    refresh: () => Promise<AuthObject | undefined>,
    register: (data: RegisterFormFields) => void,
    login: (data: LoginFormFields) => void
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

    const register = useCallback(async (data: RegisterFormFields) => {
        try{
            await axiosPublic.post(
                "/auth/register",
                data,
                { headers: { "Content-Type": "application/json" } }
            )
        }catch(err){
            throw err
        }
    }, [])

    const login = useCallback(async (data: LoginFormFields) => {
        try{
            const response = await axiosPublic.post(
                "/auth/login",
                data,
                { headers: { "Content-Type": "application/json" } }
            )
            const authObject = response.data as AuthObject
            setAuth(authObject)
        }catch(err){
            throw err
        }
    }, [])

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

    return <AuthContext.Provider value={{auth, refresh, register, login}}>
        {
            loading
                ? <LoadingPage />
                : children
        }
    </AuthContext.Provider>
}