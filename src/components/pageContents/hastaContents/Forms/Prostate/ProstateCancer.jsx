import { useState } from "react"
import prostateRiskCalc from "./prostateRiskCalc"

import ProstateCancerInfo from "./ProstateCancerInfo"

export default ()=>{
    const [age, setAge] = useState("")
    const [PSA, setPSA] = useState("")
    const [DRE, setDRE] = useState(null)
    const [PriorBiop, setPriorBiop] = useState(null)
    const [FamHist, setFamHist] = useState("")
    const [AA, setAA] = useState(null)
    
    const [message, setMessage] = useState("")

    const getResults = () => {
        if (PSA === "" || age === "" || FamHist === "" || DRE === null || PriorBiop === null || AA === null) return setMessage("empty form");

        console.table({PSA: +PSA, age, FamHist, DRE, PriorBiop, AA})
        
        const risk = prostateRiskCalc({PSA: +PSA, age, FamHist, DRE, PriorBiop, AA})
        if (isNaN(risk.highRisk)) return setMessage("error")
        return setMessage(Number(risk.highRisk.toFixed(2)))
    }

    return(
        <>
            <p>Aşağıdaki formu doldurarak prostat kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz. Form sonucu ömür boyu prostat kansrine yakalanma ihtimalinizi tahmin etmektedir.</p>

            <fieldset>
                <legend>Form</legend>
                <label htmlFor="prostate-age-input">Yaşınız:</label>
                <input
                 className="form-input"
                 id="prostate-age-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(+evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="prostate-PSA-input">Prostat spesifik antijen sayısı (ng/mL):</label>
                <input
                 className="form-input"
                 id="prostate-PSA-input" 
                 type="text" 
                 onKeyDown={isNumberKey}
                 onChange={(evt) => setPSA(evt.target.value)} 
                 value={PSA} 
                />

                <label htmlFor="prostate-DRE-input">Dijital rektal muayenesi sonucu:</label>
                <select
                 className="form-input"
                 id="prostate-DRE-input" 
                 onChange={evt => setDRE(evt.target.value === "1"? 1 : 0)} 
                >
                    <option hidden defaultValue={null}></option>
                    <option value={"1"}>Olumsuz</option>
                    <option value={"0"}>Olumlu</option>
                </select>

                <label htmlFor="prostate-Biopsy-input">Biyopsi yapılmış olup olumlu sonuçlanmış mıdır?:</label>
                <select
                 className="form-input" 
                 id="prostate-Biopsy-input"
                 onChange={evt => setPriorBiop(evt.target.value === "yes"? 1 : 0)}
                >
                    <option hidden defaultValue={null}></option>
                    <option value={"yes"}>Evet</option>
                    <option value={"no"}>Hayır</option>
                </select>

                <label htmlFor="prostate-FamHist-input">Ailede prostat kanseri geçmişi:</label>
                <input
                 className="form-input"
                 id="prostate-FamHist-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setFamHist(+evt.target.value)} 
                 value={FamHist} 
                />

                <label htmlFor="race-input">Etnik köken / Irk:</label>
                <select
                 className="form-input" 
                 id="race-input" 
                 onChange={event => setAA(event.target.value === "black" ? 1 : 0)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"white"}>Beyaz</option>                
                    <option value={"black"}>Siyahi</option>
                    <option value={"white"}>İspanyol</option>
                    <option value={"white"}>Asyalı</option>
                    <option value={"white"}>Hawaiili</option>
                </select>

                <button onClick={getResults} className="form-submit">Devam</button>
                <ProstateCancerInfo formResults={message}/>
            </fieldset>
        </>
    )
}

function isNumberKey (evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode === 37 || charCode === 39 || charCode === 46) {
        return true;
    }
    if (charCode < 31) return;

    // Sorry! This part of the code is a mess :(
    if (
        (
            (charCode < 48 || charCode > 57)
             &&
            charCode !== 190
        )
         || 
        (
            charCode === 190
             && 
            evt.target.value.split(".").length > 1
        )
    ) return evt.preventDefault()
    return
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