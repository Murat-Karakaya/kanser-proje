import { useState } from "react"
import BreastCancer from "./Forms/Breast/BreastCancer"
import LungCancer from "./Forms/Lung/LungCancer"
import LiverCancer from "./Forms/Liver/LiverCancer"
import ProstateCancer from "./Forms/Prostate/ProstateCancer"

const defaultComponent = ({setForm}) => (
    <>
        <p>Kanser risk tahmin formları:</p>
        <button className="form-select" onClick={() => setForm("Breast")}>Meme Kanseri</button>
        <button className="form-select" onClick={() => setForm("Lung")}>Akciğer Kanseri</button>
        <button className="form-select" onClick={() => setForm("Liver")}>Karaciğer Kanseri</button>
        <button className="form-select" onClick={() => setForm("Prostate")}>Prostat Kanseri</button>
        <br/>
    </>
)

export default ()=>{
    const [form, setForm] = useState("")

    let Form;
    switch (form) {
        case "Breast":
            Form = BreastCancer
            break;
        case "Lung":
            Form = LungCancer
            break;
        case "Liver":
            Form = LiverCancer
            break;
        case "Prostate":
            Form = ProstateCancer
            break;
    
        default:
            Form = defaultComponent
            break;
    }
    return(
        <>
            <h1>Form Doldurma</h1>
            {!!form && <button className="form-select" onClick={() => setForm("")}>Form Seç</button>}
            <p>Not: Verilen formların sonuçları tahminidir ve gerçekleri yansıtmayabilir.</p>
            <Form setForm={setForm}/>
        </>
    )
}
