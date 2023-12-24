import { Link } from "react-router-dom"
import "./Anonymous.css"
import { useAtom } from "jotai"
import { pageAtom } from "../../../jotai/atoms"

export default () => {
    const [, setPageId] = useAtom(pageAtom)
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