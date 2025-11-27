import { FormProvider, useForm } from "react-hook-form"
import ImageInput from "./components/ImageInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { photoUploadSchema } from "./schemas/photoUploadSchema"
import {z} from "zod"
import Button from "./components/Button"

type PhotoFormFields = z.infer<typeof photoUploadSchema>

function App() {

  const methods = useForm<PhotoFormFields>({
    resolver: zodResolver(photoUploadSchema)
  })

  const {formState: {errors}, handleSubmit} = methods

  const onSubmit = (data: PhotoFormFields) => {

    const handleImageSubmission = async (chunksArray: string[], chunksSize: number) => {
    }

    const fileReader = new FileReader()
    if(data.photo instanceof FileList){
      fileReader.readAsDataURL(data.photo[0])
      fileReader.addEventListener("load", () => {
        const {result} = fileReader
        if(typeof result === "string"){
          const length = result.length
          const chunkSize = Math.ceil(length / 200000)
          const chunksArray: string[] = []
          for(let i = 0; i < chunkSize; i++){
            chunksArray.push(result.slice(i * chunkSize, (i + 1) * chunkSize))
          }
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

export default App
