import Page from "../../pageContainer/Page";
import "./portalStyle.css"

import { useAtom } from "jotai"
import { pageAtom } from "../../../jotai/atoms";


export default ()=>{
    const [, setPageId] = useAtom(pageAtom)

    return(
        <Page id="0">
            <h1>Hoşgeldin, <div className="gradient-text">Dr. Lorem Ipsum!</div></h1>
            
            <div className="linkLineup">
                <button onClick={() => setPageId(1)} style={{"--order":"0"}} className="card" >
                    <h3>Hastalarım</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(2)} style={{"--order":"1"}} className="card" >
                    <h3>Konsultasyon Merkezi</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(3)} style={{"--order":"2"}} className="card" >
                    <h3>Dijitalleşmiş Veriler</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
                <button onClick={() => setPageId(4)} style={{"--order":"3"}} className="card" >
                    <h3>Yapay Zeka Uygulamaları</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolor, ea obcaecati quaerat vel tempora aperiam adipisci nihil fugiat sequi? Similique itaque.</p>
                </button>
            </div>
            <br />
        </Page>
    )
}
