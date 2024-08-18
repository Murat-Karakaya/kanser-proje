import { useState } from "react"
import { patentInfosAtom, userIdAtom } from "../../../../../jotai/atoms"
import { useAtom, useAtomValue } from "jotai"

export default ({formResults, smokingStatus}) => {
    const patientid = useAtomValue(userIdAtom)
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const [message, setMessage] = useState(null)

    const addFormInfo = async (newInfo) => {
        setMessage("Bilgi kaydediliyor, lütfen bekleyiniz...")
        const data = await fetch("http://localhost:1234/addFormInfo", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid, newInfo})
        })
        if (data.status < 400){
            const newPatientInfos = patientInfos.filter(el => el[0] !== newInfo[0]).concat(newInfo)
            setPatientInfos(newPatientInfos)
            setMessage("Bilgi başarıyla kaydedilmiştir.")
            return;
        }
        setMessage("İleti başarısız olmuştur.")
    }

    if (formResults === "age < somethingYear") return <p className="span-entire-row">Yaşınız, girilen başka bir değerle uyuşmamaktadır.</p>
    if (formResults === "empty form") return <p className="span-entire-row">Formu tamamen doldurmanız lazım.</p>
    if (formResults === "error") return <p className="span-entire-row">Doldurduğunuz formdan sonuç alınamamıştır.</p>
    if (formResults === "") return <></>

    if (formResults <= 1.6) {
        return (
        <div className="span-entire-row">
            <p>Kanser riskiniz yüzde {formResults} olarak tespit edilmiştir. Bu, düşük bir risk olarak kabul edilmektedir.</p>
            <div className="parent-width justify-evenly">
            <button
             onClick={() => !message && addFormInfo(`Akciğer kanseri riski %${formResults} olarak tahmin edilmiştir. ${smokingStatus ? "Sigara içmektedir" : "Sigara içmemektedir"}.`)} 
             className="form-submit"
            >Sonuçları Kaydet</button>
            </div>
            {message && <p>{message}</p>}
        </div>
        )
    }
    return (
        <div className="span-entire-row">
        <p>Kanser riskiniz yüzde {formResults} olarak tespit edilmiştir. Bu, yüksek bir risk olarak kabul edilmektedir. Riskiniz yüksek olduğu için size aşağıdaki tavsiyelere uymanızı öneriyoruz:</p>
        <ul>
            {smokingStatus && <li>Sigara içmeyi bırakmanız gerekmektedir.</li>}
            <li>Her 6-12 ayda bir Klinik muayeneye gidiniz.</li>
            <li>Tomosentez ile yıllık tarama mamografisi yaptırınız.</li>
        </ul>
        <div className="parent-width justify-evenly">
        <button
         onClick={() => !message && addFormInfo(`Akciğer kanseri riski %${formResults} olarak tahmin edilmiştir. ${smokingStatus ? "Sigara içmektedir" : "Sigara içmemektedir"}.`)} 
         className="form-submit"
        >Sonuçları Kaydet</button>
        </div>
        {message && <p>{message}</p>}
        </div>
    )
}