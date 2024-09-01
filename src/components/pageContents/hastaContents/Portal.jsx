import { Link, useNavigate } from "react-router-dom";

import { useSetAtom, useAtomValue } from "jotai"
import { darkModeAtom, pageAtom, userIdAtom, userNameAtom } from "../../../jotai/atoms";
import { useRef } from "react";


export default ()=>{
    const isDarkMode = useAtomValue(darkModeAtom)
    const userId = useAtomValue(userIdAtom)
    const name = useAtomValue(userNameAtom)
    const setPageId = useSetAtom(pageAtom)

    const rootElement = document.getElementById('root')
    const setRootProperty = (property, value) => rootElement.style.setProperty(property, value);

    const navigate = useNavigate()
    const dialogRef = useRef()

    const warn = () => {        
        if (isDarkMode) {
            setRootProperty('--default-block-background', '#4b0e0e');
            return;
        }
        setRootProperty('--default-block-background', '#fc8888');
    }

    const coolDown = () => {
        if (isDarkMode) {
            setRootProperty('--default-block-background', '#242424');
            return;
        }
        setRootProperty('--default-block-background', 'white');
    }


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
                <p>Hesabınıza dair her şeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz!</p>

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
            </div>

            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="ordered card" >
                    <h3>Doktorlarım</h3>
                    <p>Bu sayfada sizin form veya kanser tomografi görüntüleri sonuçlarına ulaşabilecek doktorların listesi yer almaktadır.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"1"}} className="ordered card" >
                    <h3>Sonuçlarım</h3>
                    <p>Bu sayfada "Doktorlarım" sayfasındaki doktorların ulaşabileceği form veya görüntü sonuçları yer almaktadır.</p>
                </button>
                <button onClick={() => setPageId(3)} style={{"--order":"2"}} className="ordered card" >
                    <h3>Form Doldurma</h3>
                    <p>Bu sayfadaki formları doldurarak ilgili kansere belirli bir süre zarfı içerisinde yakalanma ihtimalinizin tahminini görebilirsiniz.</p>
                </button>
                
            </div>
            <div style={{paddingTop: 30}} className="flex-centered parent-width">
                <button onMouseOver={warn} onMouseLeave={coolDown} onClick={() => dialogRef.current.showModal()} className="delete-accout">Hesabımı Sil</button>    
            </div>
            <br />
        </>
    )
}
