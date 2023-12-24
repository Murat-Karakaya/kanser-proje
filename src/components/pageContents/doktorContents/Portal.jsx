import { Link } from "react-router-dom";

import { useSetAtom } from "jotai"
import { pageAtom } from "../../../jotai/atoms";


export default ()=>{
    const setPageId = useSetAtom(pageAtom)

    return(
        <>
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoşgeldin, <div className="gradient-text">Lorem Ipsum!</div></h1>
                <Link to="/" className="logoutBtn">Çıkış Yap</Link>
            </div>
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="card" >
                    <h3>Hastalarım</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"3"}} className="card" >
                    <h3>Kanser Teşhis Uygulamaları</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
            </div>
            <br />
        </>
    )
}
