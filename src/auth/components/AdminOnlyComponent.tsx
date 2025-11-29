import { useAuth } from "../hooks/useAuth";

type AdminOnlyComponentProps = {
    children: React.ReactNode
}

export default function AdminOnlyComponent ({children}: AdminOnlyComponentProps){
    const {auth} = useAuth()
    return auth && auth.user.isAdmin
        ? children
        : null
}