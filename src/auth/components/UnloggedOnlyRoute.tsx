import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router";

export default function UnloggedOnlyRoute () {
    const {auth} = useAuth()
    return auth
        ? <Navigate to="/photos" replace={true} />
        : <Outlet />
}