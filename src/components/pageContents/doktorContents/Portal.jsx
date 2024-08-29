import { Link, useNavigate } from "react-router-dom";

import { useSetAtom, useAtomValue } from "jotai"
import { pageAtom, userIdAtom, userNameAtom } from "../../../jotai/atoms";
import { useRef } from "react";

export default ()=>{
    const userId = useAtomValue(userIdAtom)
    const setPageId = useSetAtom(pageAtom)
    const name = useAtomValue(userNameAtom)

    const navigate = useNavigate()
    const dialogRef = useRef()

    const deleteUser = async () => {
        const method = "delete"
        const body = JSON.stringify({userId,})
        const headers = {"Content-Type": "application/json"}
        const response = await fetch("http://localhost:1234/deleteUser", {method, headers, body})
        if (response.status >= 500) {
            alert("Kullanıcı silinirken bir hata oluştu")
            return;
        }
        if (response.status >= 400) {
            alert("Kullanıcı silinirken bir hata oluştu")
            return;   
        }
        navigate("/")
    }

    return(
        <>
            <dialog ref={dialogRef} onCancel={()=> dialogRef.current.close()}>
                <p>Hesabınıza dair her şeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>

                <div className="parent-width justify-evenly no-background">
                    <button
                    onClick={() => {
                        dialogRef.current.close()
                        deleteUser()
                    }}
                    className="relations-button">Evet</button>
                    <button
                    onClick={() => dialogRef.current.close()}
                    className="relations-button">Hayır</button>    
                </div>
            </dialog>
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoş geldin, <div className="gradient-text">{name}</div>!</h1>
                <Link to="/" className="sign-out">Çıkış Yap</Link>
                <button onClick={() => dialogRef.current.showModal()} className="delete-accout">Hesabımı Sil</button>
            </div>
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="card" >
                    <h3>Hastalarım</h3>
                    <p>Bu sayfada doktor olarak sizi seçen hastaların aldığı form veya tomografi görüntülerinin sonuçları hakkında bilgi sahibi olabilirsiniz.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"1"}} className="card" >
                    <h3>Kanser Teşhis Uygulamaları</h3>
                    <p>Bu sayfada kanser tomografi görüntülerini yükleyerek iligili kanserin iyi veya kötü huylu olup olmadığını öğrenebilirsiniz.</p>
                </button>
            </div>
            <br />
        </>
    )
}
