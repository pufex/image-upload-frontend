import { LoaderCircle } from "lucide-react";

export default function LoadingPage () {
    return <div className="w-full h-screen flex items-center justify-center">
        <LoaderCircle className="w-20 h-20 animate-spin text-color-600"/>
    </div>
}