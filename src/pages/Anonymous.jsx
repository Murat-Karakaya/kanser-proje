import { Link } from "react-router-dom"

export default () => {
    return (
        <>
        <p>
            Arayüz seçiniz...
        </p>  
        <button><Link className="coolUnderline" style={{"--tagColor":"rgb(0, 140, 255)"}} to="/doktor">Doktor Arayüzü</Link></button>      
        <button><Link className="coolUnderline" style={{"--tagColor":"rgb(0, 140, 255)"}} to="/hasta">Hasta Arayüzü</Link></button>      
        </>
    )
}