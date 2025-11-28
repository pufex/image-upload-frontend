import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if(auth){
        return auth;
    }else{
        throw new Error("useAuth() used outside its provider.")
    }
}