import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm, FormProvider } from "react-hook-form"
import { loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";

type LoginFormFields = z.infer<typeof loginSchema>

export default function RegisterForm() {

    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    const methods = useForm<LoginFormFields>({
        resolver: zodResolver(loginSchema)
    })
    const { formState: { errors }, handleSubmit, setError } = methods

    const onSubmit = async (data: LoginFormFields) => {
        try {
            setLoading(true)
            await login(data)
        } catch (err) {
            if (err instanceof AxiosError) {
                switch (err.response?.status) {
                    case 400:
                        setError("root", { message: "The credentials you have provided are invalid." })
                        break;
                    case 409:
                        setError("root", { message: "Invalid email or password." })
                        break;
                    case 404:
                        setError("root", { message: "Invalid email or password." })
                        break;
                    default:
                        setError("root", { message: "We failed to create this account." })
                        break;
                }
            } else {
                setError("root", { message: "You failed to log in." })
            }
        } finally {
            setLoading(false)
        }
    }

    return <FormProvider {...methods}>
        <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                errors.root &&
                <p className="text-xl font-medium text-center text-red-600">
                    {typeof errors.root.message === "string" && errors.root.message}
                </p>
            }

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
                            Logging in...
                            <LoaderCircle className="w-6 h-6 animate-spin text-white" />
                        </>
                        : "Log in"
                }
            </Button>
        </form>
    </FormProvider>
}