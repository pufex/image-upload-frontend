import ImageUploadForm from "../components/ImageUploadForm"

export default function ImageUplaodPage(){
    return <div className="w-full mx-auto max-w-lg py-12">
        <h2 className="text-center text-2xl text-black font-semibold">
            Upload an image to our website!
        </h2>
        <ImageUploadForm />
    </div>
}