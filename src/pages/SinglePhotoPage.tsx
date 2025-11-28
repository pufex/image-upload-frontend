import { useParams } from "react-router"

export default function SinglePhotoPage (){
    
    const {id} = useParams()
    
    return <h1>
        Single Photo Page: {id}
    </h1>
}