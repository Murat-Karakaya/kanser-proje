import Page from "../../pageContainer/Page"

import { Link } from "react-router-dom";

import { useAtom } from "jotai"
import { pageAtom } from "../../../jotai/atoms";


export default ()=>{
    const [, setPageId] = useAtom(pageAtom)

    return(
        <Page id="0">
            <div className="headFlex">
                <h1 className="inlineBlock noMargin">Hoşgeldin, <div className="gradient-text">Lorem Ipsum!</div></h1>
                <Link to="/"><button className="logoutBtn">Çıkış Yap</button></Link>
            </div>
            
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="reveal card" >
                    <h3>Sonuçlarım</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"2"}} className="reveal card" >
                    <h3>Dijitalleşmiş Veriler</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"3"}} className="reveal card" >
                    <h3>Yapay Zeka Uygulamaları</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
            </div>
            <br />
        </Page>
    )
}
