import { useState } from "react"

import BreastCancerInfo from "./BreastCancerInfo"

export default ()=>{
    const [copd, setCOPD] = useState("")
    const [bmi, setBMI] = useState("")
    const [education, setEducation] = useState("")
    const [smoking_quit_time, set_smoking_quit_time] = useState("")
    const [smoking_status, set_smoking_status] = useState("")
    const [smoking_intensity, set_smoking_intensity] = useState("")
    const [duration_smoking, set_duration_smoking] = useState("")
    const [family_hist_lung_cancer, set_family_hist_lung_cancer] = useState("")
    const [cancer_hist, set_cancer_hist] = useState("")
    const [relativesNumber, setRelativesNumber] = useState("")
    const [race, setRace] = useState("")
    const [age, setAge] = useState("")
    
    const [message, setMessage] = useState("")

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
            const body = {
                age,
                race,
                education,
                bmi,
                copd,
                cancer_hist,
                family_hist_lung_cancer,
                smoking_status,
                smoking_intensity,
                duration_smoking,
                smoking_quit_time,
            }

            try { // fetch logic
                const response = await fetch("http://localhost:80/", {method, headers, body})
                const data = await response.json()
                console.log(data)
                if (Number(data.risk) > 1.7) {// Riskin "risk" kısmında yazacağını varsaydım
                    return setMessage("malign")
                }
                return setMessage("benign")
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

                <label htmlFor="age-input2">Yaşınız:</label>
                <input
                 className="form-input"
                 id="age-input2"
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => setAge(evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="family_hist_lung_cancer">Ailede akciğer kanseri geçmişi:</label>
                <select className="form-input" id="family_hist_lung_cancer" onChange={event => set_family_hist_lung_cancer(event.target.value)}>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="cancer_hist">Kişide akciğer kanseri geçmişi:</label>
                <select className="form-input" id="cancer_hist" onChange={event => set_cancer_hist(event.target.value)}>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="education-input">Eğitim durumu:</label>
                <select className="form-input" id="education-input" onChange={event => setEducation(event.target.value)}>
                    <option value={1}>Okuryazar değil</option>
                    <option value={2}>Okuryazar/İlkokul</option>
                    <option value={3}>Ortaokul/Lise</option>
                    <option value={4}>Yüksekokul/Fakülte</option>
                    <option value={5}>Lisansüstü</option>
                </select>

                <label htmlFor="bmi-input">Vücut kitle indeksi:</label>
                <input
                 className="form-input"
                 id="bmi-input"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => setBMI(evt.target.value)}
                 value={bmi}
                />

                <label htmlFor="copd-input">Kronik obstrüktif akciğer hastalığı:</label>
                <select className="form-input" id="copd-input" onChange={event => setCOPD(event.target.value)}>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="copd-input">Sigara içme durumu:</label>
                <select className="form-input" id="copd-input" onChange={event => setCOPD(event.target.value)}>
                    <option value={1}>Sigara içiliyor</option>
                    <option value={0}>Sigara içilmiyor</option>
                </select>

                <label htmlFor="smoking_intensity">Günde içilen sigara sayısı:</label>
                <input
                 className="form-input"
                 id="smoking_intensity"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => set_smoking_intensity(evt.target.value)}
                 value={smoking_intensity}
                />

                <label htmlFor="duration_smoking">Günde içilen sigara sayısı:</label>
                <input
                 className="form-input"
                 id="duration_smoking"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => set_duration_smoking(evt.target.value)}
                 value={duration_smoking}
                />

                <label htmlFor="smoking_quit_time">Günde içilen sigara sayısı:</label>
                <input
                 className="form-input"
                 id="smoking_quit_time"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => set_smoking_quit_time(evt.target.value)}
                 value={smoking_quit_time}
                />

                <button onClick={getResults} className="form-submit">Devam</button>
                
                <BreastCancerInfo message={message}/>
            </fieldset>
        </>
    )
}