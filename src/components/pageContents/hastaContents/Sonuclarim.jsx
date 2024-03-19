import { useAtomValue, useAtom } from "jotai"
import { patentInfosAtom, userIdAtom } from "../../../jotai/atoms"

export default ()=>{
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const userId = useAtomValue(userIdAtom)

    const updateResults = async() => {
        const method = "post"
        const body = JSON.stringify({patientid: userId})
        const headers = {"Content-Type": "application/json"}
        const response = await fetch("http://localhost:1234/getRelationsAndInfos", {method, headers, body})
        const data = await response.json()
        console.log(data)
        setPatientInfos(data.patientinfos)
    }
    try {
        return(
            <>
                <h1>Sonuçlarım</h1>
                <button onClick={updateResults} className="relations-button">
                    Sayfayı Yenile
                </button>
                {
                    patientInfos[0] &&
                    <>
                        <p>Doktorların kaydedilmiş form sonuçlarına ulaşabilir. Aşağıda kaydedilmiş form sonuçları verilmiştir.</p>
                        <ul>{
                            patientInfos.map(el => <li key={el} >{el}</li>)
                        }</ul>
                    </>
                }
            </>
        )    
    } catch (error) {
        console.log(error)
        return (<>
            <h1>Sonuçlarım</h1>
            <p>Doktorların kaydedilmiş form sonuçlarına ulaşabilir. Şuan kaydedilmiş bilgi bulunmamaktadır.</p>
        </>)
    }
    
}