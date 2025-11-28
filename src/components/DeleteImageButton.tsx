import { useState } from "react";
import { useAxiosPrivate } from "../auth/hooks/useAxiosPrivate";
import { useNavigate } from "react-router";
import Button from "./Button";
import { LoaderCircle } from "lucide-react";

type DeleteImageButtonProps = {
    image_id: string
}

export default function DeleteImageButton ({image_id}: DeleteImageButtonProps){
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const handleClick = async () => {
        try{
            setLoading(true)
            await axiosPrivate.delete(`/image/${image_id}`)
            navigate("/photos")
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <Button
        disabled={loading}
        onClick={handleClick}
    >
        {
            loading
                ? <>
                    Deleting...
                    <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
                </>
                : "Delete this"
        }
    </Button>
}