import HomePageHeader from "../components/HomePageHeader"
import Gallery from "../components/Gallery"

export default function HomePage(){
    return <>
        <HomePageHeader />
        <div>
            <h1 className="w-full text-left text-black text-2xl font-semibold mb-4">
                Gallery
            </h1>
            <Gallery />
        </div>
    </>
}