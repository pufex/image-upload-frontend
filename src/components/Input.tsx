import { useFormContext } from "react-hook-form"
import { useWindowSize } from "../hooks/useWindowSizes"

type InputProps = {
    className?: string,
    name: string,
    id?: string,
    label?: string,
    type?: string,
    placeholder?: string
}

export default function Input({ className, name, id, label, type, placeholder }: InputProps) {

    const { register, formState: { errors } } = useFormContext()
    const windowWidth = useWindowSize()

    return <div className={className}>
        {


            !label && windowWidth <= 600
                ? <div className="flex items-center justify-center gap-4 mb-2">
                    {
                        label &&
                        <label
                            htmlFor={id}
                            className="text-left text-black font-medium text-lg"
                        >
                            {label}
                        </label>
                    }
                    {
                        errors[name] && windowWidth > 600
                            ? <label
                                htmlFor={id}
                                className="text-red-600 font-medium text-lg"
                            >
                                {typeof errors[name].message === "string" && errors[name].message}
                            </label>
                            : null
                    }
                </div>
                : null
        }
        <input
            className="w-full outline-none h-20 border-2 border-black/20 focus:border-blue-600 rounded-lg px-2 text-xl text-black"
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(name)}
        />
        {
            windowWidth <= 600 && errors[name]
                ? <label
                    htmlFor={id}
                    className="text-red-600 font-medium text-lg"
                >
                    {typeof errors[name].message === "string" && errors[name].message}
                </label>
                : null
        }
    </div>
}