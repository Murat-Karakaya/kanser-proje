import { Link } from "react-router-dom";

import { useSetAtom, useAtom } from "jotai"
import { pageAtom, userNameAtom } from "../../../jotai/atoms";


export default ()=>{
    const [name] = useAtom(userNameAtom)
    const setPageId = useSetAtom(pageAtom)

    return(
        <>
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoşgeldin, <div className="gradient-text">{name}!</div></h1>
                <Link to="/" className="logoutBtn">Çıkış Yap</Link>
            </div>
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="ordered card" >
                    <h3>Sonuçlarım</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"2"}} className="ordered card" >
                    <h3>Form Doldurma</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
            </div>
            <br />
        </>
    )
}
