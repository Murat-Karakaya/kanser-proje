import { useAtomValue } from "jotai"
import { isDoctorAtom } from "../../jotai/atoms"
import { useRef, useState } from "react"

import "./Relations.css"

export default ({email, info, isAccepted, toggleRelation}) => {
    const isDoctor = useAtomValue(isDoctorAtom)
    
    if (isDoctor) {

        const dialogRef1 = useRef()


        return (<>
        <dialog ref={dialogRef1} onCancel={()=> dialogRef1.current.close()}>
            <p>{email} emailli hastayla ilişkiyi kesmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>

            <div className="parent-width justify-evenly no-background">
                <button
                onClick={() => {
                    toggleRelation(email, true)
                    dialogRef1.current.close()
                }}
                className="relations-button">Evet</button>
                <button
                onClick={() => dialogRef1.current.close()}
                className="relations-button">Hayır</button>    
            </div>
        </dialog>
        <div className="relationsCard">
            <p>{email}</p>
            {
            isAccepted ?
             (<>
             {
                info.map(el => <p key={el}>{el}</p>)
             }
             <button
              onClick={() => dialogRef1.current.showModal()} 
              className="relations-button"
             >İlşkiyi Kes</button>

             </>)
                : 
             (<>
             <p>{email} kullanıcısı doktor olarak sizi seçmek istiyor. Kabul ediyor musunuz?</p>
             <div className="parent-width justify-evenly self-align-center no-background">
                <button onClick={() => toggleRelation(email, false)} className="relations-button">Kabul Et</button>
                <button onClick={() => toggleRelation(email, true)} className="relations-button">Reddet</button>
             </div>
             </>)
            }
        </div>
        </>)
    }

    const dialogRef2 = useRef()
    const [dialogMessagePiece, setDialogMessagePiece] = useState("")

    return (<>
    <dialog ref={dialogRef2} onCancel={()=> dialogRef2.current.close()}>
        <p>{email} emailli {dialogMessagePiece} kaldırmak istediğinize emin misiniz? Bu işlem geri alınamaz.</p>

        <div className="parent-width justify-evenly no-background">
            <button
            onClick={() => {
                toggleRelation(email, true)
                dialogRef2.current.close()
            }}
            className="relations-button">Evet</button>
            <button
            onClick={() => dialogRef2.current.close()}
            className="relations-button">Hayır</button>    
        </div>
    </dialog>
    <div className="relationsCard">
        <p>{email}</p>
        {
        isAccepted ?
            <button
             onClick={() => {
                setDialogMessagePiece("doktorla olan ilişkiyi")
                dialogRef2.current.showModal()
             }} 
             className="relations-button"
            >İlşkiyi Kes</button>
            :
            (<>
            <p>Doktor {email}'un cevabı bekleniyor...</p>
            <button
             onClick={() => {
                toggleRelation(email, true)
                setDialogMessagePiece("doktora olan isteğini")
            }} 
             className="relations-button"
            >İsteğimi Kaldır</button> 
            </>)
        }
    </div>
    </>)
}