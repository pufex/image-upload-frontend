import { Routes, Route, Navigate } from "react-router"
import Nav from "./layouts/Nav"
import HomePage from "./pages/HomePage"
import ImageUplaodPage from "./pages/ImageUploadPage"

export const BASE_PAGE = "/images"

export default function App() {
  return <Routes>
    <Route path={BASE_PAGE} element={<Nav />}>
      <Route index element={<HomePage />}/>
      <Route path="upload-photo" element={<ImageUplaodPage />}/>
    </Route>

    <Route path="/*" element={<Navigate to={BASE_PAGE} />} />
  </Routes>
}

  

  
