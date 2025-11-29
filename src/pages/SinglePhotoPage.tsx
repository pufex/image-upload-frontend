import { useParams } from "react-router"
import DeleteImageButton from "../components/DeleteImageButton"
import AdminOnlyComponent from "../auth/components/AdminOnlyComponent"

export default function SinglePhotoPage (){
    
    const {id} = useParams()
    
    return <h1>
        Single Photo Page: {id}
        <br />
        <AdminOnlyComponent>
            <DeleteImageButton image_id={id ?? ""} />
        </AdminOnlyComponent>
    </h1>
}