import { useAuth } from "../hooks/useAuth"

type PrivateComponentProps = {
    children: React.ReactNode
}

export default function PrivateComponent({children}: PrivateComponentProps){
    const {auth} = useAuth()
    
    return auth 
        ? children
        : null
}