import { useState } from "react"
import breastRiskCalc from "./breastRiskCalc"

import BreastCancerInfo from "./BreastCancerInfo"

export default ()=>{
    const [shouldShowInput, setShouldShowInput] = useState(false)

    const [age, setAge] = useState("")
    const [ageMenarche, setAgeMenarche] = useState("")
    const [firstBirthAge, setFirtBirthAge] = useState(0) // zero if no live birth
    const [biopsyNumber, setBiopsyNumber] = useState("")
    const [relativesNumber, setRelativesNumber] = useState("")
    const [ethnicities, setEthnicities] = useState("")
    
    const [message, setMessage] = useState("")

    const getResults = () => {
        if (age < ageMenarche) return setMessage("age < ageMenarche")
        if (age < firstBirthAge) return setMessage("age < firstBirthAge")
        if (age < 20) return setMessage("age < 20")
        if (!ageMenarche || !age || !ethnicities || biopsyNumber === "" || relativesNumber === "") return setMessage("empty form")
        console.log(age, age+5, ageMenarche, biopsyNumber, firstBirthAge, relativesNumber, ethnicities)
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

                <label htmlFor="did-have-first-birth">Canlı doğum gerçekleşmiş midir?:</label>
                <select className="form-input" id="did-have-first-birth" onChange={evt => {
                    if (evt.target.value === "no") {
                        setShouldShowInput(false)
                        setFirtBirthAge(0)
                        return;
                    }
                    if (evt.target.value === "yes") return setShouldShowInput(true)
                    
                    }} >
                    <option hidden defaultValue={null}></option>
                    <option value={"yes"}>Evet</option>
                    <option value={"no"}>Hayır</option>
                </select>

                {shouldShowInput ? (<>
                    <label htmlFor="first-birth-age">İlk canlı doğum gerçekleştirme yaşı:</label>
                    <input
                    className="form-input"
                    id="first-birth-age" 
                    type="text" 
                    onKeyDown={isWholeNumberKey}
                    onChange={(evt) => setFirtBirthAge(+evt.target.value)} 
                    value={firstBirthAge} 
                    />
                </>):(<></>) }

                

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

function isWholeNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    
    // Allow left and right arrow keys (37 and 39 respectively)
    if (charCode === 37 || charCode === 39 || charCode === 46) {
        return true;
    }
    
    // Check if the key is not a number
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        return false;
    }
    
    return true;
}