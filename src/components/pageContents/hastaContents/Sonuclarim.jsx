import { useAtomValue } from "jotai"
import { patentInfosAtom } from "../../../jotai/atoms"

export default ()=>{
    const patientInfos = useAtomValue(patentInfosAtom)
    try {
        return(
            <>
                <h1>Sonuçlarım</h1>
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
        return (<>
            <h1>Sonuçlarım</h1>
            <p>Doktorların kaydedilmiş form sonuçlarına ulaşabilir. Şuan kaydedilmiş bilgi bulunmamaktadır.</p>
        </>)
    }
    
}