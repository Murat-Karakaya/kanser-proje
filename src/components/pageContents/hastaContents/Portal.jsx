import { Link } from "react-router-dom";

import { useSetAtom, useAtomValue } from "jotai"
import { pageAtom, userNameAtom } from "../../../jotai/atoms";


export default ()=>{
    const name = useAtomValue(userNameAtom)
    const setPageId = useSetAtom(pageAtom)

    return(
        <>
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoş geldin, <div className="gradient-text">{name}!</div></h1>
                <Link to="/" className="logoutBtn">Çıkış Yap</Link>
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
            <br />
        </>
    )
}
