import { useAuth } from "../hooks/useAuth";

type UnloggedOnlyComponentProps = {
    children: React.ReactNode
}

export default function UnloggedOnlyComponent({children}:UnloggedOnlyComponentProps){
    const {auth} = useAuth();
    return auth
        ? null
        : children
}