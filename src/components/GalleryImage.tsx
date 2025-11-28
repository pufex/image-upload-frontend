import { LoaderCircle } from "lucide-react"
import type { GalleryPhoto } from "../types"
import { useNavigate } from "react-router"

type GalleryImageProps = {
    photo: GalleryPhoto
}

export default function GalleryImage({ photo }: GalleryImageProps) {
    
    const navigate = useNavigate()

    return <div
        className="h-[300px] w-full cursor-pointer flex items-center justify-center bg-slate-400 rounded-md overflow-hidden border shadom-md"
        onClick={() => navigate(`/photos/${photo.image_id}`)}
    >
        {
            photo.loading
                ? <LoaderCircle className="w-8 h-8 text-slate-600 animate-spin" />
                : photo.error
                    ? <p className="p-4">
                        {photo.error}
                    </p>
                    : <img
                        className="h-full w-full object-cover object-center"
                        src={photo.data}
                    />

        }
    </div>
}