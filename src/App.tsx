import { Routes, Route, Navigate } from "react-router"
import Nav from "./layouts/Nav"
import HomePage from "./pages/HomePage"
import ImageUplaodPage from "./pages/ImageUploadPage"
import SinglePhotoPage from "./pages/SinglePhotoPage"
import UnloggedOnlyRoute from "./auth/components/UnloggedOnlyRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

export const BASE_PAGE = "/photos"

export default function App() {
  return <Routes>
    <Route element={<Nav />}>

      <Route path={BASE_PAGE} >
        <Route index element={<HomePage />} />
        <Route path=":id" element={<SinglePhotoPage />} />
        <Route path="upload-photo" element={<ImageUplaodPage />} />
      </Route>

      <Route path="/auth" element={<UnloggedOnlyRoute />}>
        <Route path="login" element={<LoginPage />}/>
        <Route path="register" element={<RegisterPage />}/>
      </Route>

    </Route>


    <Route path="/*" element={<Navigate to={BASE_PAGE} />} />
  </Routes>
}




