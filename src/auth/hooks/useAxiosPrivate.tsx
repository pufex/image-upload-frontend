import { useEffect } from "react"
import { useAuth } from "./useAuth"
import { axiosPrivate } from "../axiosPrivate"

export const useAxiosPrivate = () => {
    const {auth, refresh} = useAuth()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if(!config.headers["authorization"]){
                    config.headers["authorization"] = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            (err) => Promise.reject(err)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            config => config,
            async (err) => {
                const prevRequest = err?.config
                if(err?.response.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true
                    const authObject = await refresh()
                    if(authObject){
                        prevRequest.headers["authorization"] = `Bearer ${authObject.accessToken}`
                    }
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(err)
            }
        )
        
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [auth])

    return axiosPrivate
}