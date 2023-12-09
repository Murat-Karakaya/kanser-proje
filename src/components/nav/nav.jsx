import "./navstyle.css";
import Navbutton from "../nav/navbutton";
import Hambutton from "../hambutton/hambutton";
import { useState } from "react";
import ColorSchemeButton from "../ColorSchemeButton/ColorSchemeButton";

export default ({buttonValues}) => { // buttonValues is an array, for example: ["Portal", "Hastalarım", "Konsultasyon", "Dijitalleştirme", "Yapay Zeka"]
    const[smallNavVis,newsmalldis]=useState(false);

    const hamClicked=()=>{
        document.querySelector("nav").style.display="block"
        setTimeout(()=>{//MUST BE ASYNC
            newsmalldis(true);
        },0)
    }

    const hideNav=()=>{
        newsmalldis(false)
        setTimeout(()=>{
            document.querySelector("nav").style.display="none"
        },200)
    }
    
    return(
        <>
            <Hambutton clickHandler={hamClicked}/>
            <nav className={smallNavVis?"navVis":""}>
                <button aria-label="close-Navigation" onClick={hideNav} id="nav-x" className="button-x" ></button>
                {
                    buttonValues.map((value, i)=> <Navbutton key={value} id={i} >{value}</Navbutton>)
                }
                <ColorSchemeButton className="end"/>
            </nav>
        </>
    )
}
