import { useState } from "react"

import BreastCancerInfo from "./BreastCancerInfo"

export default ()=>{
    const [age, setAge] = useState("")
    const [ageMenarche, setAgeMenarche] = useState("")
    const [firstBirthAge, setFirtBirthAge] = useState("")
    const [biopsyNumber, setBiopsyNumber] = useState("")
    const [relativesNumber, setRelativesNumber] = useState("")
    const [ethnicities, setEthnicities] = useState("")
    
    const [message, setMessage] = useState(1.8)

    const isWholeNumberKey = (evt) => {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            return false;
        }
        return;
    }

    const getResults = async () => {
        if (Number(age) < Number(ageMenarche)) return setMessage("age < ageMenarche")
        if (Number(age) < Number(firstBirthAge)) return setMessage("age < firstBirthAge")

        if (relativesNumber && biopsyNumber && firstBirthAge && ageMenarche && age) {
            
            const method = "POST"
            const headers = {
                "Content-Type": "application/json"
            }
            const body = JSON.stringify({
                numRelative: relativesNumber,
                firstLiveBirth: firstBirthAge,
                menarcheAge: ageMenarche,
                numBiopsy: biopsyNumber,
                age: age,
                race: ethnicities,
            })

            try { // fetch logic
                const response = await fetch("http://localhost:80/", {method, headers, body})
                const data = await response.json()
                console.log(data)
                return setMessage(data.risk) // Riskin "risk" kısmında yazacağını varsaydım
            } catch (error) {
                console.error(error)
                return setMessage("error")  
            }
        }
        return setMessage("empty form")
    }

    return(
        <>
            <p>Aşağıdaki formu doldurarak göğüs kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="age-input">Yaşınız:</label>
                <input
                 className="form-input"
                 id="age-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="menarche-age">İlk adet görme yaşı:</label>
                <input
                 className="form-input"
                 id="menarche-age" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAgeMenarche(evt.target.value)} 
                 value={ageMenarche} 
                />

                <label htmlFor="first-birth-age">İlk doğum gerçekleştirme yaşı:</label>
                <input
                 className="form-input"
                 id="first-birth-age" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setFirtBirthAge(evt.target.value)} 
                 value={firstBirthAge} 
                />

                <label htmlFor="biopsy-input">Toplam biyopsi sayısı:</label>
                <input
                 className="form-input"
                 id="biopsy-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setBiopsyNumber(evt.target.value)} 
                 value={biopsyNumber} 
                />

                <label htmlFor="first-degree-relatives">Göğüs kanseri görmüş 1. dereceden akraba sayısı:</label>
                <input
                 className="form-input"
                 id="first-degree-relatives" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setRelativesNumber(evt.target.value)} 
                 value={relativesNumber}
                />

                <label htmlFor="ethnicities-input">Etnik köken / Irk:</label>
                <select className="form-input" id="ethnicities-input" onChange={event => setEthnicities(event.target.value)} >
                    <option value={"white"}>Beyaz</option>                    
                    <option value={"black"}>Siyahi</option>
                    <option value={"chinese"}>Çinli</option>
                    <option value={"japanese"}>Japon</option>
                    <option value={"filipino"}>Filipinli</option>
                    <option value={"hawaiian"}>Hawaiili</option>
                    <option value={"pacific"}>Avrupalı</option>
                    <option value={"asian"}>Asyalı</option>
                </select>
                <button onClick={getResults} className="form-submit">Devam</button>
                <BreastCancerInfo message={message}/>
            </fieldset>
        </>
    )
}