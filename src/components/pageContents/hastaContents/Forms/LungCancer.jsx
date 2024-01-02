import { useState } from "react"

import LungCancerInfo from "./LungCancerInfo"

export default ()=>{
    const [copd, setCOPD] = useState(null)
    const [bmi, setBMI] = useState(0.0)
    const [education, setEducation] = useState(null)
    const [smoking_quit_time, set_smoking_quit_time] = useState(0)
    const [smoking_status, set_smoking_status] = useState(null)
    const [smoking_intensity, set_smoking_intensity] = useState(0)
    const [duration_smoking, set_duration_smoking] = useState(0)
    const [family_hist_lung_cancer, set_family_hist_lung_cancer] = useState(null)
    const [cancer_hist, set_cancer_hist] = useState(null)
    const [race, setRace] = useState(null)
    const [age, setAge] = useState(0)
    
    const [message, setMessage] = useState("")

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
                evt.target.value.split(".").length > 1
            )
        ) return evt.preventDefault()
        return;
    }

    const isWholeNumberKey = (evt) => {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            return false;
        }
        return;
    }

    const getResults = async () => {
        if (age < duration_smoking || age < smoking_quit_time) return setMessage("age < somethingYear")
        if (
            !age || 
            !race || 
            education === null || 
            !+bmi || 
            copd === null || 
            cancer_hist === null || 
            family_hist_lung_cancer === null || 
            smoking_status === null
        ) return setMessage("empty form")
            
        const method = "POST"
        const headers = {
            "Content-Type": "application/json"
        }
        
        const body = JSON.stringify({
            age,
            race,
            education,
            bmi: +bmi,
            copd,
            cancer_hist,
            family_hist_lung_cancer,
            smoking_status,
            smoking_intensity,
            duration_smoking,
            smoking_quit_time,
        })

        try { // fetch logic
            const response = await fetch("http://localhost:80/", {method, headers, body})
            const data = await response.json()
            console.log(data)
            
            if (response.status >= 400) return setMessage("error")

            if (Number(data.risk) > 1.7) {// Riskin "risk" kısmında yazacağını varsaydım
                return setMessage("malign")
            }
            return setMessage("benign")
        } catch (error) {
            console.error(error)
            return setMessage("error")  
        }
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
                 onChange={evt => setAge(+evt.target.value)} 
                 value={age}
                />

                <label htmlFor="family_hist_lung_cancer">Ailede akciğer kanseri geçmişi:</label>
                <select className="form-input" id="family_hist_lung_cancer" onChange={event => set_family_hist_lung_cancer(event.target.value)}>
                    <option hidden defaultValue={null}></option>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="cancer_hist">Kişide akciğer kanseri geçmişi:</label>
                <select className="form-input" id="cancer_hist" onChange={event => set_cancer_hist(parseInt(event.target.value))}>
                    <option hidden defaultValue={null}></option>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="education-input">Eğitim durumu:</label>
                <select className="form-input" id="education-input" onChange={event => setEducation(parseInt(event.target.value))}>
                    <option hidden defaultValue={null}></option>
                    <option value={1}>Lise mezunu değil</option>
                    <option value={2}>Lise mezunu</option>
                    <option value={3}>Lise sonrası biraz eğitim</option>
                    <option value={4}>Biraz yüksekokul eğitim</option>
                    <option value={5}>Yüksekokul mezunu</option>
                    <option value={6}>Lisansüstü derece</option>
                </select>

                <label htmlFor="bmi-input">Vücut kitle indeksi:</label>
                <input
                 className="form-input"
                 id="bmi-input"
                 type="text"
                 onKeyDown={isNumberKey}
                 onChange={evt => setBMI(evt.target.value)}
                 value={bmi}
                />

                <label htmlFor="copd-input">Kronik obstrüktif akciğer hastalığı:</label>
                <select className="form-input" id="copd-input" onChange={event => setCOPD(+event.target.value)}>
                    <option hidden defaultValue={null}></option>
                    <option value={0}>Yok</option>
                    <option value={1}>Var</option>
                </select>

                <label htmlFor="smoking_status_input">Sigara içme durumu:</label>
                <select className="form-input" id="smoking_status_input" onChange={event => set_smoking_status(+event.target.value)}>
                    <option hidden defaultValue={null}></option>
                    <option value={1}>Sigara içiliyor</option>
                    <option value={0}>Sigara içilmiyor</option>
                </select>

                <label htmlFor="smoking_intensity">Günde içilen sigara sayısı:</label>
                <input
                 className="form-input"
                 id="smoking_intensity"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => set_smoking_intensity(+evt.target.value)}
                 value={smoking_intensity}
                />

                <label htmlFor="duration_smoking">Kaç yıl sigara içildi:</label>
                <input
                 className="form-input"
                 id="duration_smoking"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={evt => set_duration_smoking(+evt.target.value)}
                 value={duration_smoking}
                />

                <label htmlFor="smoking_quit_time">Sigarayı bıraktıktan sonra üzerinden geçen yıl sayısı:</label>
                <input
                 className="form-input"
                 id="smoking_quit_time"
                 type="text"
                 onKeyDown={isNumberKey}
                 onChange={evt => set_smoking_quit_time(+evt.target.value)}
                 value={smoking_quit_time}
                />

                <label htmlFor="race-input">Etnik köken / Irk:</label>
                <select className="form-input" id="race-input" onChange={event => setRace(event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"white"}>Beyaz</option>                
                    <option value={"black"}>Siyahi</option>
                    <option value={"chinese"}>İspanyol</option>
                    <option value={"japanese"}>Asyalı</option>
                    <option value={"hawaiian"}>Hawaiili</option>
                </select>

                <button onClick={getResults} className="form-submit">Devam</button>
                
                <LungCancerInfo message={message}/>
            </fieldset>
        </>
    )
}