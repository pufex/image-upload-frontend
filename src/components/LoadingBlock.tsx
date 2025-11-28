import { LoaderCircle } from "lucide-react";

export default function LoadingBlock (){
    return <div className="w-full h-40 flex items-center justify-center">
        <LoaderCircle className="w-10 h-10 animate-spin text-blue-600"/>
    </div>
}