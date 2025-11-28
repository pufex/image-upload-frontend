import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router"
import type { GalleryPhoto, ImageDeclaration, ImageChunk } from "../types"
import { axiosPublic } from "../api/axiosPublic"

export default function Gallery() {

    const navigate = useNavigate()
    const [photos, setPhotos] = useState<GalleryPhoto[]>([])
    const [searchParams, _setSearchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const page = !pageParam || isNaN(Number(pageParam))
        ? 1
        : Number(pageParam)

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axiosPublic.get(`/image/${page}`)
            const declarations: ImageDeclaration[] = response.data
            const galleryPhotos = await Promise.all(declarations.map(async (declaration): Promise<GalleryPhoto> => {
                const numbersArray = []
                for (let i = 0; i < declaration.chunksAmount; i++) {
                    numbersArray.push(i + 1)
                }
                const declarationImages = await Promise.all(numbersArray.map(async (chunksNumber) => {
                    const chunkResponse = await axiosPublic.post("/image", { chunksNumber, image_id: declaration._id })
                    const { data } = chunkResponse.data as ImageChunk
                    return { data, chunksNumber }
                }))
                return {
                    image_id: declaration._id,
                    data: declarationImages
                        .sort((a, b) => a.chunksNumber - b.chunksNumber)
                        .map((image) => image.data)
                        .join("")
                }
            }))
            console.log(galleryPhotos)
            setPhotos(galleryPhotos)
        }

        fetchImages()
    }, [page])


    return <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {
            photos.map((photo) => (
                <div 
                    className="h-[300px] w-full cursor-pointer"
                    onClick={() => navigate(`/photos/${photo.image_id}`)}
                >
                    <img 
                        className="h-full w-full object-cover object-center bg-slate-400"
                        src={photo.data}
                    />
                </div>
            ))
        }
    </div>
}