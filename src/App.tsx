import { Routes, Route, Navigate } from "react-router"
import Nav from "./layouts/Nav"
import HomePage from "./pages/HomePage"
import ImageUplaodPage from "./pages/ImageUploadPage"
import SinglePhotoPage from "./pages/SinglePhotoPage"

export const BASE_PAGE = "/photos"

export default function App() {
  return <Routes>
    <Route path={BASE_PAGE} element={<Nav />}>
      <Route index element={<HomePage />}/>
      <Route path=":id" element={<SinglePhotoPage />}/>
      <Route path="upload-photo" element={<ImageUplaodPage />}/>
    </Route>

    <Route path="/*" element={<Navigate to={BASE_PAGE} />} />
  </Routes>
}

  

  
