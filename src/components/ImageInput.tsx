import { useFormContext } from "react-hook-form"
import { useState, useRef } from "react"
import { Plus } from "lucide-react"
import Button from "./Button"

type ImageInputProps = {
    name: string,
    id?: string,
    className?: string
}

export default function ImageInput({ name, id, className = "" }: ImageInputProps) {

    const [preview, setPreview] = useState<string>("")
    const { register, formState: {errors} } = useFormContext()

    const inputRef = useRef<HTMLInputElement | undefined>(null)

    const registerMethods = register(name)
    const {
        ref: registerRef,
        onChange: registerOnChange,
    } = registerMethods

    const clickInput = () => {
        inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        registerOnChange(e)
        if (e.target.files) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.addEventListener("load", () => {
                if (typeof fileReader.result === "string") {
                    setPreview(fileReader.result)
                }
            })
        }
    }

    const handleRef = (e: HTMLInputElement | null) => {
        registerRef(e)
        inputRef.current = e
    }

    return <div className={`${className} w-full flex flex-col items-center`}>
        <input
            className="hidden"
            type="file"
            id={id}
            accept="image/png, image/jpg"
            multiple={false}
            {...registerMethods}
            ref={handleRef}
            onChange={handleChange}
        />
        <div className="w-full max-w-[200px] sm:max-w-[300px]">
            <div 
                className={`mb-4 flex items-center justify-center rounded-md w-[200px] h-[200px] sm:h-[300px] sm:w-[300px] ${!preview && "bg-slate-300 border-slate-500 border-6 border-dashed"} cursor-pointer`}
                onClick={clickInput}
            >
                {
                    preview 
                        ? <img 
                            className="w-full h-full object-cover object-center"
                            src={preview} 
                            alt="Image preview" 
                        />
                        : <Plus strokeWidth={3} className="w-40 h-40 text-slate-400" />
                }
            </div>
            <Button
                onClick={clickInput}
                className="w-full"
            >
                {
                    preview
                        ? "Change"
                        : "Upload"
                }
            </Button>
        </div>
        {
            errors[name] && <h2 className="w-full text-center mt-4 text-red-600 font-medium">
                {typeof errors[name].message === "string" && errors[name].message}
        </h2>
        }
    </div>
}