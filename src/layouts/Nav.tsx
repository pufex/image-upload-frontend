import { Outlet } from "react-router"
import { Link } from "react-router"

export default function Nav(){

    return <>
        <div className="w-full h-20"/>
        <nav className="fixed top-0 left-0 w-full h-20 bg-blue-700 border-b-2 border-b-blue-800">
            <div className="h-full w-full max-w-5xl mx-auto px-4 flex items-center justify-center gap-4">
                <ul className="flex items-center gap-4">
                    <li>
                        <Link
                            to="/photos"
                            className="text-xl text-white font-semibold"
                        >
                            Photos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/photos/upload-photo"
                            className="text-xl text-white font-semibold"
                        >
                            Upload photo
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        <main className="w-full max-w-5xl mx-auto">
            <Outlet />
        </main>
    </>
}
