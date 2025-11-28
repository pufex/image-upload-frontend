import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router";

export default function AdminOnlyRoute (){
    const {auth} = useAuth()
    return auth && auth.user.isAdmin
        ? <Outlet />
        : <Navigate to="/auth/login" replace={true} />

}