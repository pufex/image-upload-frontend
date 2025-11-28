import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import { registerSchema } from "../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoaderCircle } from "lucide-react";

type RegisterFormFields = z.infer<typeof registerSchema>

export default function RegisterForm() {

    const [loading, setLoading] = useState(false)

    const methods = useForm<RegisterFormFields>({
        resolver: zodResolver(registerSchema)
    })
    const {formState: {errors}, handleSubmit, setError} = methods

    return <FormProvider {...methods}>
        <form
            className="w-full max-w-md mx-auto"
        >
            {
                errors.root &&
                    <p className="text-xl font-medium text-center text-red-600">
                        {typeof errors.root.message === "string" && errors.root.message}
                    </p>
            }
            <Input
                name="name"
                id="name"
                label="Username"
                className="mb-4"
                placeholder="Your username..."
            />
            <Input
                name="email"
                id="email"
                label="Email Address"
                className="mb-4"
                placeholder="Your Email Address..."
            />
            <Input
                name="password"
                id="password"
                label="Password"
                type="password"
                className="mb-4"
                placeholder="*********"
            />
            <Button 
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {
                    loading
                        ? <>
                            Registering...
                            <LoaderCircle className="w-6 h-6 animate-spin text-white"/>
                        </>
                        : "Register now!"
                }
            </Button>
        </form>
    </FormProvider>
}