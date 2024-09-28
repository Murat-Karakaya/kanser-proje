import { useState } from "react"
import CardiovaskularInfo from "./CardiovaskularInfo"
import cardiovaskularRiskCalc from "./cardiovaskularRiskCalc"

export default ()=>{
    const [age, setAge] = useState("")
    const [totalCholesterol, setTotalCholesterol] = useState("")
    const [hdl, sethdl] = useState("")
    const [systolic, setSystolic] = useState("")
    const [gender, setGender] = useState(null)
    const [hypertensive, setHypertensive] = useState(null)
    const [smoker, setSmoker] = useState(null)
    const [diabetic, setDiabetic] = useState(null)
    const [race, setRace] = useState(null)

    const [message, setMessage] = useState("")

    const getResults = () => {
        if (age === "" || totalCholesterol === "" || hdl === "" || systolic === "" || gender === null || hypertensive === null || smoker === null || diabetic === null || race === null) return setMessage("empty form");

        console.table({age, gender, race, totalCholesterol, hdl, systolic, hypertensive, smoker, diabetic})

        const risk = cardiovaskularRiskCalc(age, gender, race, totalCholesterol, hdl, systolic, hypertensive, smoker, diabetic)
        if (isNaN(risk)) return setMessage("error")
        return setMessage(Number(risk))
    }

    return(
        <>
            <p>Aşağıdaki formu doldurarak aterosklerotik (kısaca damar tıkanıklığına dair) kardiyovasküler hastalığa karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz. Form sonucu on yıl içerisinde aterosklerotik kardiyovasküler hastalığa yakalanma ihtimalinizi tahmin etmektedir.</p>
            <p>Risk %7.5'ten az olursa düşük olarak kabul edilecektir.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="cardo-age-input">Yaşınız:</label>
                <input
                 className="form-input"
                 id="cardo-age-input"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setAge(+evt.target.value)}
                 value={age}
                />

                <label htmlFor="cardo-gender-input">Cinsiyetiniz:</label>
                <select
                 className="form-input"
                 id="cardo-gender-input"
                 onChange={event => setGender(event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"male"}>Bay</option>
                    <option value={"female"}>Bayan</option>
                </select>

                <label htmlFor="cardo-hyper-input">Yüksek kan basıncınız var mı?:</label>
                <select
                 className="form-input"
                 id="cardo-hyper-input"
                 onChange={event => setHypertensive(+event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"1"}>Evet</option>
                    <option value={"0"}>Hayır</option>
                </select>

                <label htmlFor="cardo-smoker-input">Sigara içiyor musunuz?:</label>
                <select
                 className="form-input"
                 id="cardo-smoker-input"
                 onChange={event => setSmoker(+event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"1"}>Evet</option>
                    <option value={"0"}>Hayır</option>
                </select>

                <label htmlFor="cardo-dia-input">Diyabetiniz var mı?:</label>
                <select
                 className="form-input"
                 id="cardo-dia-input"
                 onChange={event => setDiabetic(+event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"1"}>Evet</option>
                    <option value={"0"}>Hayır</option>
                </select>

                <label htmlFor="cardo-totalCol-input">Toplam kolesterol değeri (mg/dL) (130-320):</label>
                <input
                 className="form-input"
                 id="cardo-totalCol-input"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setTotalCholesterol(+evt.target.value)}
                 value={totalCholesterol}
                />

                <label htmlFor="cardo-hdl-input">Yüksek yoğunluklu lipoprotein değeri (mg/dL) (20-100):</label>
                <input
                 className="form-input"
                 id="cardo-hdl-input"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => sethdl(+evt.target.value)}
                 value={hdl}
                />

                <label htmlFor="cardo-sys-input">Sistolik kan basıncı değeri (mm Hg) (90-200):</label>
                <input
                 className="form-input"
                 id="cardo-sys-input"
                 type="text"
                 onKeyDown={isWholeNumberKey}
                 onChange={(evt) => setSystolic(+evt.target.value)}
                 value={systolic}
                />

                <label htmlFor="race-input">Etnik köken / Irk:</label>
                <select
                 className="form-input"
                 id="race-input"
                 onChange={event => setRace(event.target.value)} >
                    <option hidden defaultValue={null}></option>
                    <option value={"white"}>Beyaz</option>
                    <option value={"aa"}>Siyahi</option>
                    <option value={"white"}>İspanyol</option>
                    <option value={"white"}>Asyalı</option>
                    <option value={"white"}>Hawaiili</option>
                </select>

                <button onClick={getResults} className="form-submit">Devam</button>
                <CardiovaskularInfo formResults={message} isSmoking={!!smoker}/>
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