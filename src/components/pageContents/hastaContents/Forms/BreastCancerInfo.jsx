import { useState } from "react"
import { patentInfosAtom, userIdAtom } from "../../../../jotai/atoms"
import { useAtom, useAtomValue } from "jotai"

export default ({message}) => {
    const patientid = useAtomValue(userIdAtom)
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const [info, setInfo] = useState(null)

    const addFormInfo = async (newInfo) => {
        setInfo("Bilgi iletiliyor, lütfen bekleyiniz...")
        const data = await fetch("http://localhost:1234/addFormInfo", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid, newInfo})
        })
        if (data.status < 400){
            setPatientInfos(patientInfos.concat(newInfo))
            setInfo("Bilgi başarıyla iletilmiştir.")
            return;
        }
        setInfo("İleti başarısız olmuştur.")
    }

    if (message === "age < ageMenarche") return <p className="span-entire-row">Yaşınız ilk adet yaşınızdan küçük olamaz.</p>
    if (message === "empty form") return <p className="span-entire-row">Formu tamamen doldurmanız lazım.</p>
    if (message === "error") return <p className="span-entire-row">Doldurduğunuz formdan sonuç alınamamıştır.</p>
    if (message === "") return <></>

    if (message <= 1.7) {
        return (
        <div className="span-entire-row">
            <p>Kanser riskiniz {message} olarak tespit edilmiştir. Bu, düşük bir risk olarak kabul edilmektedir.</p>
            <div className="parent-width justify-evenly">
            <button
             onClick={() => !info && addFormInfo(`Meme kanseri riski ${message} olarak tahmin edilmiştir.`)} 
             className="form-submit"
            >Sonuçları Kaydet</button>
            </div>
            {info && <p>{info}</p>}
        </div>
        )
    }
    return (
        <div className="span-entire-row">
        <p>Kanser riskiniz {message} olarak tespit edilmiştir. Bu, yüksek bir risk olarak kabul edilmektedir. Riskiniz yüksek olduğu için size aşağıdaki tavsiyelere uymanızı öneriyoruz:</p>
        <ul>
            <li>Her 6-12 ayda bir Klinik muayeneye gidiniz.</li>
            <li>Tomosentez ile yıllık tarama mamografisi yaptırınız.</li>
        </ul>
        <div className="parent-width justify-evenly">
        <button
         onClick={() => !info && addFormInfo(`Meme kanseri riski ${message} olarak tahmin edilmiştir.`)} 
         className="form-submit"
        >Sonuçları Kaydet</button>
        </div>
        {info && <p>{info}</p>}
        </div>
    )
}