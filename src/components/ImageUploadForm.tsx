import { FormProvider, useForm } from "react-hook-form"
import { axiosPublic } from "../api/axiosPublic"
import { zodResolver } from "@hookform/resolvers/zod"
import { photoUploadSchema } from "../schemas/photoUploadSchema"
import { useState } from "react"
import type { z } from "zod"
import ImageInput from "./ImageInput"
import Button from "./Button"
import { ArrowUpFromLine, LoaderCircle } from "lucide-react"

type PhotoFormFields = z.infer<typeof photoUploadSchema>

export default function ImageUploadForm() {
    const methods = useForm<PhotoFormFields>({
        resolver: zodResolver(photoUploadSchema)
    })

    const [loading, setLoading] = useState(false)
    const { formState: { errors }, handleSubmit, setError } = methods

    const onSubmit = (data: PhotoFormFields) => {
        const handleImageSubmission = async (chunksArray: string[], chunksAmount: number, size: Number) => {
            try {
                const declarationResponse = await axiosPublic.post(
                    "/image/declaration",
                    { size, chunksAmount },
                    { headers: { "Content-Type": "application/json" } }
                )

                const { declaration_id: image_id } = declarationResponse.data
                const promisesArray = []
                for (let i = 0; i < chunksAmount; i++) {
                    promisesArray.push(i + 1)
                }

                const responses = await Promise.all(promisesArray.map((chunkNumber) => {
                    return axiosPublic.post(
                        "/image/upload",
                        { image_id, chunksNumber: chunkNumber, data: chunksArray[chunkNumber - 1] },
                        { headers: { "Content-Type": "application/json" } }
                    )
                }))
                console.log(responses)
            } catch (err) {
                console.log(err)
                setError("root", {message: "We failed to submit this image. Try again later."})
            }
        }

        setLoading(true)
        const fileReader = new FileReader()
        if (data.photo instanceof FileList) {
            const size = data.photo[0].size
            const chunkSize = 100000
            fileReader.readAsDataURL(data.photo[0])
            fileReader.addEventListener("load", async () => {
                setLoading(true)
                const { result } = fileReader
                if (typeof result === "string") {
                    const length = result.length
                    const chunksAmount = Math.ceil(length / chunkSize)
                    const chunksArray: string[] = []
                    for (let i = 0; i < chunksAmount; i++) {
                        chunksArray.push(result.slice(i * chunkSize, (i + 1) * chunkSize))
                    }
                    console.log(chunksArray)
                    await handleImageSubmission(chunksArray, chunksAmount, size)
                }
                setLoading(false)
            })
        }else{
            setError("root", {message: "There was a problem with submitted files."})
        }
        setLoading(false)
    }
    return <FormProvider {...methods}>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
        >
            {
                errors.root
                    && <p className="text-lg text-center text-red-600 font-medium">
                        {errors.root.message}
                    </p>
            }
            <ImageInput
                name="photo"
                id="photo"
                className="mb-4 mt-6"
            />
            <Button 
                type="submit"
                className="w-full max-w-[200px] sm:max-w-[300px]"
                disabled={loading}
            >
                {
                    loading
                        ? <>
                            Sending...
                            <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
                        </>
                        : <>
                            Send
                            <ArrowUpFromLine className="w-6 h-6 text-white" />
                        </>
                }
            </Button>
        </form>
    </FormProvider>
}