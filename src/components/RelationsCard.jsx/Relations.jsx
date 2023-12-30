import { useAtomValue } from "jotai"
import { isDoctorAtom } from "../../jotai/atoms"
import "./Relations.css"

export default ({email, isAccepted, toggleRelation}) => {
    const isDoctor = useAtomValue(isDoctorAtom)

    if (isDoctor) {
        return (
        <div className="relationsCard">
            <p>{email}</p>
            {
            isAccepted ?
             (<>
             <p>Hasta hakkında ek bilgi yok</p>
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
            (<>
            <p>Doktorunuzun bildikleri:</p>
            <button onClick={() => toggleRelation(email, true)} className="relations-button">İlişkiyi Kes</button>
            </>)
            :
            (<>
            <p>Doktor {email}'un cevabı bekleniyor...</p>
            <button onClick={() => toggleRelation(email, true)} className="relations-button">İsteğimi Kaldır</button>   
            </>)
        }
    </div>
    )
}