import { Link } from "react-router-dom"

export default () => {
    return (
        <>
        <p>
            Nasıl devam edeceksiniz!?
        </p>  
        <button><Link to="/doktor">Doktor Arayüzü</Link></button>      
        <button><Link to="/hasta">Hasta Arayüzü</Link></button>      
        </>
    )
}