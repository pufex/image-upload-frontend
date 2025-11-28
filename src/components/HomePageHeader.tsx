import Button from "./Button";
import { useNavigate } from "react-router";

export default function HomePageHeader() {

    const navigate = useNavigate()

    return <header className="w-full py-12">
        <h1 className="w-full py-6 text-center text-3xl text-black font-bold">Your Photos Share Gallery</h1>
        <p className="w-full mb-8 max-w-[500px] mx-auto text-center text-xl text-black">
            Upload your favorite photos from your disk. Click the button below to be navigated to the photo upload form. You can only upload one photo per request.
        </p>
        <Button
            onClick={() => navigate("/photos/upload-photo")}
            className="mx-auto"
        >
            Upload a photo
        </Button>
    </header>
}