import LoginForm from "../auth/forms/LoginForm"

export default function LoginPage (){
    return <>
        <h1 className="text-2xl text-center text-black font-bold mb-8 pt-8">
            Login Page
        </h1>
        <LoginForm />
    </>
}