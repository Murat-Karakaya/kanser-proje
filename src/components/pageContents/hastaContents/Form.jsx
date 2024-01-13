import { useState } from "react"
import BreastCancer from "./Forms/BreastCancer"
import ProstateCancer from "./Forms/ProstateCancer"
import LungCancer from "./Forms/LungCancer"

export default ()=>{
    const [form, setForm] = useState("")

    let Form;
    switch (form) {
        case "Breast":
            Form = BreastCancer
            break;
        case "Prostate":
            Form = ProstateCancer
            break;
        case "Lung":
            Form = LungCancer
            break;
    
        default:
            Form  = () => <p>Hakkında form doldurmak istediğiniz kanser türü seçiniz...</p>
            break;
    }
    return(
        <>
            <h1>Form Doldurma</h1>
            <p>Not: Verilen formların sonuçları tahminidir ve gerçekleri yansıtmayabilir.</p>
            <button style={{display: "inline-block"}} className="form-submit" onClick={() => setForm("Breast")}>Meme Kanseri</button>
            <button style={{display: "inline-block"}} className="form-submit" onClick={() => setForm("Lung")}>Akciğer Kanseri</button>
            <Form />
        </>
    )
}
