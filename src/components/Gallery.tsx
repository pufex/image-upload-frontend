import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router"
import type { GalleryPhoto, ImageDeclaration, ImageChunk } from "../types"
import { axiosPublic } from "../api/axiosPublic"
import { LoaderCircle } from "lucide-react"
import LoadingBlock from "./LoadingBlock"

export default function Gallery() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState<GalleryPhoto[]>([])
    const [searchParams, _setSearchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const page = !pageParam || isNaN(Number(pageParam))
        ? 1
        : Number(pageParam)

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true)
            const response = await axiosPublic.get(`/image/${page}`)
            const declarations: ImageDeclaration[] = response.data
            setPhotos(declarations.map(({ _id }) => ({
                image_id: _id,
                loading: true,
                error: "",
                data: "",
            })))
            setLoading(false)
            declarations
                .map(async (declaration) => {
                    try {
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
                            loading: false,
                            error: "",
                            image_id: declaration._id,
                            data: declarationImages
                                .sort((a, b) => a.chunksNumber - b.chunksNumber)
                                .map((image) => image.data)
                                .join("")
                        }
                    } catch (err) {
                        throw { image_id: declaration._id }
                    }
                })
                .forEach((promise) =>
                    promise
                        .then((result) => {
                            setPhotos(prev => prev.map(photo => photo.image_id === result.image_id
                                ? result
                                : photo
                            ))
                        })
                        .catch(err => {
                            setPhotos(prev => prev.map(photo => photo.image_id === err.image_id
                                ? {
                                    ...photo,
                                    error: "Failed to fetch this image.",
                                    loading: false,
                                }
                                : photo
                            ))
                        })
                )
        }

        fetchImages()
    }, [page])


    return loading
        ? <LoadingBlock />
        : <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {
                photos.map((photo) => (
                    <div
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
                ))
            }
        </div>
}