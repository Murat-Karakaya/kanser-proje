import "./Anonymous.css"
import { useSetAtom } from "jotai"
import { isDoctorAtom, pageAtom, userIdAtom, userNameAtom } from "../../../jotai/atoms"
import { useEffect } from "react"

export default () => {
    const setPageId = useSetAtom(pageAtom)
    const setUserName = useSetAtom(userNameAtom)
    const setUserId = useSetAtom(userIdAtom)
    const setIsDoctor = useSetAtom(isDoctorAtom)

    useEffect(() => {
        setIsDoctor(null)
        setPageId(0)
        setUserId("")
        setUserName("")
    },[])
    
    return (
    <div id="grid-centered">
        <div id="anonymous-page">
            <p className="span-entire-row">
                Arayüz seçiniz...
            </p>
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0", "--tagColor":"var(--page-line)"}} className="gradient-button-component  coolUnderline" >
                    Giriş Yap
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"1", "--tagColor":"var(--page-line)"}} className="gradient-button-component  coolUnderline" >
                    Hesap Aç
                </button>
            </div>
        </div>
    </div>
    )
}