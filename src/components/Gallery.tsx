import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import type { GalleryPhoto, ImageDeclaration, ImageChunk } from "../types"
import { usePagination } from "../hooks/usePagination/usePagination"
import { axiosPublic } from "../api/axiosPublic"
import GalleryImage from "./GalleryImage"
import GallerySkeleton from "./GallerySkeleton"


export default function Gallery() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState<GalleryPhoto[]>([])
    const [searchParams, _setSearchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const page = !pageParam || isNaN(Number(pageParam))
        ? 1
        : Number(pageParam)

    const {
        paginatedList,
        nextButton,
        previousButton,
        pagination
    } = usePagination<GalleryPhoto>(photos, 10)

    useEffect(() => {
        const fetchImages = async () => {
            try {
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
            } catch (err) {
                console.log(err)
                setError("Failed to fetch images from our API.")
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [page])


    return loading
        ? <GallerySkeleton />
        : error
            ? <h1 className="w-full text-center my-6 text-xl font-medium text-red-600">
                {error}
            </h1>
            : <div className="w-full">
                <div className="w-full flex items-center gap-2 mb-2">
                    {previousButton}
                    {pagination}
                    {nextButton}
                </div>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    {paginatedList.map((photo) => <GalleryImage photo={photo} />)}
                </div>
            </div>
}