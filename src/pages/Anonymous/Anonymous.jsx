import { Link } from "react-router-dom"
import "./Anonymous.css"

export default () => {
    return (
        <div id="anonymous-page-container">
            <div id="anonymous-page">
                <p id="first-paragraph">
                    Arayüz seçiniz...
                </p>
                
                <Link
                className="button-like-component coolUnderline" 
                style={{"--tagColor":"var(--page-line)"}} 
                to="/doktor">
                    Doktor Arayüzü
                </Link>
                <Link
                className="button-like-component coolUnderline" 
                style={{"--tagColor":"var(--page-line)"}} 
                to="/hasta">
                    Hasta Arayüzü
                </Link>
            </div>
        </div>
    )
}