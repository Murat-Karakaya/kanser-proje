import { useState } from "react"
import { patentInfosAtom, userIdAtom } from "../../../../../jotai/atoms"
import { useAtom, useAtomValue } from "jotai"

export default ({formResults, isSmoking}) => {
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
            const newPatientInfos = patientInfos.filter(el => el.substring(0, 10) !== newInfo.substring(0, 10)).concat(newInfo)
            setPatientInfos(newPatientInfos)
            setMessage("Bilgi başarıyla kaydedilmiştir.")
            return;
        }
        setMessage("İleti başarısız olmuştur.")
    }

    if (formResults === "empty form") return <p className="span-entire-row">Formu tamamen doldurmanız lazım.</p>
    if (formResults === "error") return <p className="span-entire-row">Doldurduğunuz formdan sonuç alınamamıştır.</p>
    if (formResults === "") return <></>

    if (formResults < 7.5) {
        return (
        <div className="span-entire-row">
            <p>Aterosklerotik kardiyovasküler hastalığa yakalanma ihtimaliniz {formResults} olarak tespit edilmiştir. Risk düşükten yükseğe doğru %5 altı, %5-%7.4 arası, %7.5-%19.9 arası ve %20 ve yükseği olarak sıralanmaktadır.</p>
            <div className="parent-width justify-evenly">
            <button
             onClick={() => !message && addFormInfo(`Aterosklerotik kardiyovasküler riski %${formResults} olarak tahmin edilmiştir. Sigara ${isSmoking ? "içmektedir" : "içmemektedir."}`)} 
             className="form-submit"
            >Sonuçları Kaydet</button>
            </div>
            {message && <p>{message}</p>}
        </div>
        )
    }
    return (
        <div className="span-entire-row">
        <p>Aterosklerotik kardiyovasküler riskiniz yüzde {formResults} olarak tespit edilmiştir. Bu, yüksek bir risk olarak kabul edilmektedir. Riskiniz yüksek olduğu için doktorunuzla bu durumu danışmanızı {isSmoking && "ve sigarayı bırakmanızı"} tavsiye ediyoruz:</p>
        <div className="parent-width justify-evenly">
        <button
         onClick={() => !message && addFormInfo(`Aterosklerotik kardiyovasküler riski %${formResults} olarak tahmin edilmiştir.`)} 
         className="form-submit"
        >Sonuçları Kaydet</button>
        </div>
        {message && <p>{message}</p>}
        </div>
    )
}