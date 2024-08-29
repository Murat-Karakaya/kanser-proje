import { useAtomValue, useAtom } from "jotai"
import { patentInfosAtom, userIdAtom } from "../../../jotai/atoms"
import { useState, useRef } from "react"

const note = 'Doktorların kaydedilmiş sonuçlara ulaşabilir. Şuan kaydedilmiş bilgi bulunmamaktadır.'

export default () => {
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const userId = useAtomValue(userIdAtom)

    const [isEdit, setIsEdit] = useState()
    const [message, setMessage] = useState('')
    const dialogRef = useRef()

    let unSelectedArr = [...patientInfos]

    const setUnSelectedArr = ({ target: { checked } }, id) => {
        if (checked) {
            unSelectedArr[id] = null
            return
        }
        unSelectedArr[id] = patientInfos[id]
    }

    const updateResults = async() => {
        setMessage("Yenileniyor...")
        const method = "post"
        const body = JSON.stringify({patientid: userId})
        const headers = {"Content-Type": "application/json"}
        const response = await fetch("http://localhost:1234/getRelationsAndInfos", {method, headers, body})
        const data = await response.json()
        if (response.status >= 500) {
            setMessage("Sayfayı yenilerken bir sorun oluştu")
            return;
        }
        if (response.status >= 400) {
            setMessage("Sayfayı yenilerken bir sorun oluştu")
            return;
        }
        setMessage("")
        setPatientInfos(data.patientinfos)
        setIsEdit(false)
    }

    const deleteSelectedFromPatientInfos = async() => {
        unSelectedArr = unSelectedArr.filter(el => el !== null)
        const method = "delete"
        const body = JSON.stringify({patientid: userId, newInfos: unSelectedArr})
        const headers = {"Content-Type": "application/json"}
        const response = await fetch("http://localhost:1234/setInfos", {method, headers, body})
        if (response.status >= 500) {
            setMessage("Sonuçları düzenlerken bir sorun oluştu")
            return;
        }
        if (response.status >= 400) {
            setMessage("Sonuçları düzenlerken bir sorun oluştu")
            return;   
        }
        setPatientInfos(unSelectedArr)
        setIsEdit(false)
    }

    if(patientInfos.length === 0) {
        console.log("patient infos length zero")
        return (<>
            <h1>Sonuçlarım</h1>
            <button onClick={updateResults} className="relations-button">
                Sayfayı Yenile
            </button>
            {message ? <p>{message}</p> : null}

            <p>{note}</p>
        </>)
    }

    if(isEdit) {

        return (<>
        <dialog ref={dialogRef} onCancel={()=> dialogRef.current.close()}>
            <p>İşaretlediğiniz bilgileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>

            <div className="parent-width justify-evenly no-background">
                <button
                onClick={() => {
                    deleteSelectedFromPatientInfos()
                    dialogRef.current.close()
                }}
                className="relations-button">Evet</button>
                <button
                onClick={() => dialogRef.current.close()}
                className="relations-button">Hayır</button>    
            </div>
        </dialog>
        <h1>Sonuçlarım</h1>
        <button onClick={updateResults} className="relations-button">
            Sayfayı Yenile
        </button>

        {message ? <p>{message}</p> : null}

        <p>{note}</p>
        <div className="list-bg">{
            patientInfos.map((el, i) => (<>
                <p key={el} >
                    <input
                     type="checkbox" 
                     key={el+"checkbox"} 
                     onChange={(e) => setUnSelectedArr(e, i)} 
                    />
                    {el}
                </p>
            </>))
        }</div>

        <br />

        <button onClick={() => setIsEdit(false)} className="relations-button">
            İptal
        </button>
        <button onClick={() => dialogRef.current.showModal()} className="relations-button">
            Seçilenleri Sil
        </button>
        </>)
    }

    return(<>
        <h1>Sonuçlarım</h1>
        <button onClick={updateResults} className="relations-button">
            Sayfayı Yenile
        </button>

        {message ? <p>{message}</p> : null}

        <p>{note}</p>
        <div className="list-bg">{
            patientInfos.map((el, i) => <p key={i} >{el}</p>)
        }</div>

        <br />
        <button onClick={() => setIsEdit(true)} className="relations-button">
            Sonuçlarımı düzenle
        </button>
    </>)
}