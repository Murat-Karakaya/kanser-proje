import { useAtomValue } from "jotai"
import { isDoctorAtom } from "../../jotai/atoms"
import "./Relations.css"

export default ({email, info, isAccepted, toggleRelation}) => {
    const isDoctor = useAtomValue(isDoctorAtom)

    if (isDoctor) {
        return (
        <div className="relationsCard">
            <p>{email}</p>
            {
            isAccepted ?
             (<>
             {
                info.map(el => <p key={el}>{el}</p>)
             }
             <button onClick={() => toggleRelation(email, true)} className="relations-button">İlşkiyi Kes</button>
             </>)
                : 
             (<>
             <p>{email} kullanıcısı doktor olarak sizi seçmek istiyor. Kabul ediyor musunuz?</p>
             <div className="parent-width justify-evenly no-background">
                <button onClick={() => toggleRelation(email, false)} className="relations-button">Kabul Et</button>
                <button onClick={() => toggleRelation(email, true)} className="relations-button">Reddet</button>
             </div>
             </>)
            }
        </div>
        )
    }
    return (
    <div className="relationsCard">
        <p>{email}</p>
        {
        isAccepted ?
            <button onClick={() => toggleRelation(email, true)} className="relations-button">İlişkiyi Kes</button>
            :
            (<>
            <p>Doktor {email}'un cevabı bekleniyor...</p>
            <button onClick={() => toggleRelation(email, true)} className="relations-button">İsteğimi Kaldır</button>   
            </>)
        }
    </div>
    )
}