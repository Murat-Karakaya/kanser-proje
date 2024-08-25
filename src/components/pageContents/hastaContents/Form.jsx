import { useState } from "react"
import BreastCancer from "./Forms/Breast/BreastCancer"
import LungCancer from "./Forms/Lung/LungCancer"
import LiverCancer from "./Forms/Liver/LiverCancer"
import ProstateCancer from "./Forms/Prostate/ProstateCancer"
import Cardiovaskular from "./Forms/Cardiovaskular/Cardiovaskular"

const defaultComponent = ({setForm}) => (
    <>
        <p>Kanser risk tahmin formları:</p>
        <button className="form-select" onClick={() => setForm("Breast")}>Meme Kanseri</button>
        <button className="form-select" onClick={() => setForm("Lung")}>Akciğer Kanseri</button>
        <button className="form-select" onClick={() => setForm("Liver")}>Karaciğer Kanseri</button>
        <button className="form-select" onClick={() => setForm("Prostate")}>Prostat Kanseri</button>
        <br/>
        <p>Kardiyovasküler risk tahmin formu:</p>
        <button className="form-select" onClick={() => setForm("Cardiovaskular")}>Aterosklerotik</button>
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
        case "Cardiovaskular":
            Form = Cardiovaskular
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
