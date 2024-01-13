import { useState } from "react"
import breastRiskCalc from "./breastRiskCalc"

import BreastCancerInfo from "./BreastCancerInfo"

export default ()=>{
    const [age, setAge] = useState(0)
    const [ageMenarche, setAgeMenarche] = useState(0)
    const [firstBirthAge, setFirtBirthAge] = useState(0)
    const [biopsyNumber, setBiopsyNumber] = useState(0)
    const [relativesNumber, setRelativesNumber] = useState(0)
    const [ethnicities, setEthnicities] = useState("")
    
    const [message, setMessage] = useState("")

    const isWholeNumberKey = (evt) => {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            return false;
        }
        return;
    }

    const getResults = () => {
        if (age < ageMenarche) return setMessage("age < ageMenarche")
        if (age < firstBirthAge) return setMessage("age < firstBirthAge")

        if (!ageMenarche || !age || !ethnicities) return setMessage("empty form")
        const risk = breastRiskCalc(age, age+5, ageMenarche, biopsyNumber, firstBirthAge, relativesNumber, ethnicities)
        if (isNaN(risk)) return setMessage("error")
        return setMessage(Number(risk.toFixed(2)))
    }

    return(
        <>
            <p>Aşağıdaki formu doldurarak meme kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz. Form sonucu beş yıl içerisinde meme kansrine yakalanma ihtimalinizi tahmin etmektedir.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="age-input">Yaşınız:</label>
                <input
                 className="form-input"
                 id="age-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(+evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="menarche-age">İlk adet görme yaşı:</label>
                <input
                 className="form-input"
                 id="menarche-age" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAgeMenarche(+evt.target.value)} 
                 value={ageMenarche} 
                />

                <label htmlFor="first-birth-age">İlk doğum gerçekleştirme yaşı:</label>
                <input
                 className="form-input"
                 id="first-birth-age" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setFirtBirthAge(+evt.target.value)} 
                 value={firstBirthAge} 
                />

                <label htmlFor="biopsy-input">Toplam biyopsi sayısı:</label>
                <input
                 className="form-input"
                 id="biopsy-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setBiopsyNumber(+evt.target.value)} 
                 value={biopsyNumber} 
                />

                <label htmlFor="first-degree-relatives">Meme kanseri görmüş 1. dereceden akraba sayısı:</label>
                <input
                 className="form-input"
                 id="first-degree-relatives" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setRelativesNumber(+evt.target.value)} 
                 value={relativesNumber}
                />

                <label htmlFor="ethnicities-input">Etnik köken / Irk:</label>
                <select className="form-input" id="ethnicities-input" onChange={event => setEthnicities(event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"white"}>Beyaz</option>                    
                    <option value={"hispanic"}>İspanyol</option>                    
                    <option value={"black"}>Siyahi</option>
                    <option value={"chinese"}>Çinli</option>
                    <option value={"japanese"}>Japon</option>
                    <option value={"filipino"}>Filipinli</option>
                    <option value={"hawaiian"}>Hawaiili</option>
                    <option value={"pacific"}>Pasifik adalı</option>
                    <option value={"asian"}>Asyalı</option>
                </select>
                <button onClick={getResults} className="form-submit">Devam</button>
                <BreastCancerInfo formResults={message}/>
            </fieldset>
        </>
    )
}