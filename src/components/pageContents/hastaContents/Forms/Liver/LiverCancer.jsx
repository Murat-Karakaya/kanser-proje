import { useState } from "react"
import liverRiskCalc from "./liverRiskCalc"

import LiverCancerInfo from "./LiverCancerInfo"

const liverHBVDNAObj = {
    "1": 0,
    "2": 0.11648,
    "3": 1.31467,
    "4": 2.27028,
    "5": 2.09258
}

export default ()=>{
    const [age, setAge] = useState(null)
    const [paramGender, setParamGender] = useState(null)
    const [paramALT, setParamALT] = useState(null)
    const [paramHBeAg, setParamHBeAg] = useState(null)
    const [paramHBVDNAlevel, setParamHBVDNAlevel] = useState(null)
    
    const [message, setMessage] = useState("")

    const getResults = () => {
        if (paramGender === null || age === null || paramALT === null || paramHBeAg === null || paramHBVDNAlevel === null) return setMessage("empty form");

        console.table({paramGender, age, paramALT, paramHBeAg, paramHBVDNAlevel})
        
        const risk = liverRiskCalc({paramGender, age, paramALT, paramHBeAg, paramHBVDNAlevel})
        if (isNaN(risk)) return setMessage("error")
        return setMessage(Number(risk.toFixed(2)))
    }

    return(
        <>
            <p>Aşağıdaki formu doldurarak karaciğer kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz. Form sonucu üç yıl içerisinde karaciğer kansrine yakalanma ihtimalinizi tahmin etmektedir.</p>
            <p>Risk %2'den az veya %2'ye eşit olursa düşük olarak kabul edilecektir.</p>
            <p>Uyarı: Karaciğer kanseri risk ölçümünde sizde hepatit B olduğu varsayılmaktadır. Eğer sizde hepatit B yoksa bu sonuç sizin için geçersizdir.</p>

            <fieldset>
                <legend>Form</legend>
                <label htmlFor="liver-age-input">Yaşınız:</label>
                <input
                 className="form-input"
                 id="liver-age-input" 
                 type="text" 
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(+evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="liver-gender-input">Cinsiyetiniz:</label>
                <select className="form-input" id="liver-gender-input" onChange={evt => {
                    if (evt.target.value === "Bayan") return setParamGender(0)
                    if (evt.target.value === "Bay") return setParamGender(1)
                }} >
                    <option hidden defaultValue={null}></option>
                    <option value={"Bay"}>Bay</option>
                    <option value={"Bayan"}>Bayan</option>
                </select>

                <label htmlFor="liver-ALT-input">Litre kan başına ALT enzimi ünite sayısı:</label>
                <select
                 className="form-input"
                 id="liver-ALT-input" 
                 onChange={evt => {
                    if (evt.target.value === "1") return setParamALT(0)
                    if (evt.target.value === "2") return setParamALT(0.38823)
                    if (evt.target.value === "3") return setParamALT(0.96311)
                 }} 
                >
                    <option hidden defaultValue={null}></option>
                    <option value={"1"}>15'ten düşük</option>
                    <option value={"2"}>15-45 aralığında</option>
                    <option value={"3"}>45'ten fazla</option>
                </select>

                <label htmlFor="liver-HBeAg-input">Hepatit B e-antijeni bulunmakta mıdır?:</label>
                <select
                 className="form-input" 
                 id="liver-HBeAg-input"
                 onChange={evt => setParamHBeAg(evt.target.value === "yes"? 0.81308 : 0)}
                >
                    <option hidden defaultValue={null}></option>
                    <option value={"yes"}>Evet</option>
                    <option value={"no"}>Hayır</option>
                </select>

                <label htmlFor="liver-HBVDNA-input">Mililitre başına hepatit B virüsü DNA'sı kopya sayısı:</label>
                <select
                 className="form-input" 
                 id="liver-HBVDNA-input" 
                 onChange={evt => setParamHBVDNAlevel(liverHBVDNAObj[evt.target.value])} 
                >
                    <option hidden defaultValue={null}></option>
                    <option value={"2"}>300-999 aralığında</option>
                    <option value={"3"}>1000-9999 aralığında</option>
                    <option value={"4"}>10000-99999 aralığında</option>
                    <option value={"5"}>99999'dan fazla</option>
                </select>
                <button onClick={getResults} className="form-submit">Devam</button>
                <LiverCancerInfo formResults={message}/>
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