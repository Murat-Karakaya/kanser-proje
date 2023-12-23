import { useState } from "react"
import prostateRiskCalc from "./prostateRiskCalc.js"

export default () => {
    const [age, setAge] = useState("")
    const [PSA, setPSA] = useState("")
    const [DRE, setDRE] = useState("")
    const [AA, setAA] = useState(0)
    const [priorBiop, setPriorBiop] = useState("")
    const [famHist, setFamHist] = useState("")

    const [message, setMessage] = useState("")

    const isWholeNumberKey = (evt) => {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            return false;
        }
        return;
    }

    const isNumberKey = (evt) => {
        const charCode = (evt.which) ? evt.which : evt.keyCode
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
                (evt.target.value.length === 0 || evt.target.value.includes('.'))
            )
        ) return evt.preventDefault();
        return;
    }

    const getResults = () => {
        if (PSA, DRE, priorBiop, famHist, AA, age) {
            console.log(prostateRiskCalc({
                PSA,
                DRE,
                priorBiop,
                famHist,
                AA,
                age
            }))
            return setMessage("İleti başarıyla tamamlanmıştır!")  
        }
        return setMessage("Formu tamamen doldurmanız lazım.")
    }
    return(
        <>
            <p>Aşağıdaki formu doldurarak prostat kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="age-input">Yaş:</label>
                <input
                 className="form-input"
                 id="age-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="PSA-input">Prostat spesifik antijen düzeyi:</label>
                <input
                 className="form-input"
                 id="PSA-input"
                 type="text" 
                 onKeyDown={isNumberKey}
                 onChange={(evt) => setPSA(evt.target.value)} 
                 value={PSA} 
                />

                <label htmlFor="PriorBiop-input">Geçirdiği biyopsi sayısı:</label>
                <input
                 className="form-input"
                 id="PriorBiop-input"
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setPriorBiop(evt.target.value)} 
                 value={priorBiop} 
                />

                <label htmlFor="DRE-input">Dijital rektal muayene değeri:</label>
                <input
                 className="form-input"
                 id="DRE-input"
                 type="text" 
                 onKeyDown={isNumberKey}
                 onChange={(evt) => setDRE(evt.target.value)} 
                 value={DRE} 
                />

                <label htmlFor="FamHist-input">Prostat kanseri görmüş akraba sayısı:</label>
                <input
                 className="form-input"
                 id="FamHist-input"
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setFamHist(evt.target.value)} 
                 value={famHist}
                />

                <label htmlFor="ehnicities-input">Etnik köken:</label>
                <select className="form-input" onChange={event => setAA(event.target.value)} id="ehnicities-input">
                    <option value={1}>Afrika</option>
                    <option value={0}>Amerika</option>
                    <option value={0}>Asya</option>
                    <option value={0}>Avrupa</option>
                </select>
                <button onClick={getResults} className="form-submit">Devam</button>
                {message && message}
            </fieldset>
        </>
    )
}