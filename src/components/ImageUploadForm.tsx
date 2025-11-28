import { FormProvider, useForm } from "react-hook-form"
import { axiosPublic } from "../api/axiosPublic"
import { zodResolver } from "@hookform/resolvers/zod"
import { photoUploadSchema } from "../schemas/photoUploadSchema"
import type {z} from "zod"
import ImageInput from "./ImageInput"
import Button from "./Button"

type PhotoFormFields = z.infer<typeof photoUploadSchema>

export default function ImageUploadForm() {
    const methods = useForm<PhotoFormFields>({
        resolver: zodResolver(photoUploadSchema)
    })

    const { formState: { errors }, handleSubmit } = methods

    const onSubmit = (data: PhotoFormFields) => {
        console.log("submitting")
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
            }
        }

        const fileReader = new FileReader()
        if (data.photo instanceof FileList) {
            const size = data.photo[0].size
            const chunkSize = 100000
            fileReader.readAsDataURL(data.photo[0])
            fileReader.addEventListener("load", async () => {
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
            })
        }
    }
    return <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageInput name="photo" />
      <Button type="submit">
        Submit
      </Button>
    </form>
  </FormProvider>
}