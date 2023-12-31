import { Link } from "react-router-dom";

import { useSetAtom, useAtomValue } from "jotai"
import { pageAtom, userNameAtom } from "../../../jotai/atoms";


export default ()=>{
    const setPageId = useSetAtom(pageAtom)
    const name = useAtomValue(userNameAtom)

    return(
        <>
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoşgeldin, <div className="gradient-text">{name}!</div></h1>
                <Link to="/" className="logoutBtn">Çıkış Yap</Link>
            </div>
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="card" >
                    <h3>Hastalarım</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"1"}} className="card" >
                    <h3>Kanser Teşhis Uygulamaları</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
            </div>
            <br />
        </>
    )
}
