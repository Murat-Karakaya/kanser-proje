import { useState } from "react"
import BreastCancer from "./BreastCancer"
import ProstateCancer from "./ProstateCancer"
import LungCancer from "./LungCancer"

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
            <button onClick={() => setForm("Breast")}>Göğüs Kanseri</button>
            <button onClick={() => setForm("Lung")}>Akciğer Kanseri</button>
            <button onClick={() => setForm("Prostate")}>Prostat Kanseri</button>
            <Form />
        </>
    )
}
