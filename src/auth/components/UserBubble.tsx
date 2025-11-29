import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
import type { GalleryPhoto, UserImageChunk, UserImageDeclaration } from "../../types"
import { LoaderCircle } from "lucide-react"
import { axiosPublic } from "../../api/axiosPublic"

export default function UserBubble (){

    const [_error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [profilePicture, setProfilePicture] = useState<GalleryPhoto | null>(null)
    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const fetchProfilePicture = async () => {
            setLoading(true)
            try{
                const response = await axiosPublic.post(
                    "/image/get/declaration",
                    {image_id: auth?.user.profile_picture_id}
                )
                const declaration = response.data as UserImageDeclaration
                setProfilePicture({
                    loading: true,
                    data: "",
                    error: "",
                    image_id: declaration._id
                })
                setLoading(false)

                const chunksNumbers: number[] = []
                for(let i = 0; i<declaration.chunksAmount; i++){
                    chunksNumbers.push(i+1)
                }

                const chunksArray = await Promise.all(chunksNumbers.map(async (chunkNumber) => {
                    return await axiosPublic.post(
                        "/image/get/chunk",
                        {chunkNumber, image_id: declaration._id}
                    ) as UserImageChunk
                }))

                setProfilePicture(prev => {
                    if(!prev){
                        return null
                    }else{
                        return {
                            ...prev, 
                            loading: false,
                            data: chunksArray
                                .sort((a,b) => a.chunkNumber - b.chunkNumber)
                                .map((chunk) => chunk.data)
                                .join("")
                        }
                    }
                })

            }catch(err){
                setProfilePicture({
                    loading: false,
                    data: "",
                    error: "There was a problem fetching this profile picture.",
                    image_id: ""
                })
                setError("There was a problem fetching this profile picture.")
                setLoading(false)
            }
        }

        if(auth && auth.user.profile_picture_id){
            fetchProfilePicture()
        }

    }, [auth])

    return auth 
        ? <div 
            onClick={() => navigate(`/profile/${auth.user._id}`)}
            className="w-10 h-10 rounded-full overflow-hidden border-4 border-blue-800 flex items-center justify-center bg-slate-400"
        >
            {
                loading
                    ? <LoaderCircle className="w-6 h-6 animate-spin text-black"/>
                    : <img 
                        src={auth.user.profile_picture_id !== null && profilePicture
                            ? profilePicture.data
                            : "/default-avatar.png"
                        }
                        alt={auth.user.name}
                        className="w-fcd ull h-full object-cover object-center"
                    />
            }
        </div> 
        : null
}