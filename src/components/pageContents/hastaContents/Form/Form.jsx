import { useState } from "react"
import BreastCancer from "./BreastCancer"
import ProstateCancer from "./ProstateCancer"

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
    
        default:
            Form  = () => {
                return <p>Hakkında form doldurmak istediğiniz kanser türü seçiniz...</p>
            }
            break;
    }
    return(
        <>
            <h1>Form Doldurma</h1>
            <button onClick={() => setForm("Breast")}>Göğüs Kanseri</button>
            <button onClick={() => setForm("Prostate")}>Prostat Kanseri</button>
            <Form />
        </>
    )
}
