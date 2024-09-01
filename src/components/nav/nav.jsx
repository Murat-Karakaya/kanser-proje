import "./navstyle.css";
import Navbutton from "./navbutton";
import Hambutton from "../hambutton/hambutton";
import { useEffect, useRef, useState } from "react";
import ColorSchemeButton from "../ColorSchemeButton/ColorSchemeButton";

const Nav=({buttonValues})=> {
    const navElement = useRef(null)
    const [ smallNavVis, setSmallNavVis ] = useState(false)

    useEffect(()=>{ // This is here so that the nav buttons are unfocusable when the nav is not oppened
        if(window.innerWidth >= 770 || smallNavVis) return

        setTimeout(() => {
            navElement.current.style.display = "none"
        }, 200)
    }, [smallNavVis])

    const hamClicked = () => {
        navElement.current.style.display = "block"
        setTimeout(()=> setSmallNavVis(true), 0)
    }

    const hideNav = () => setSmallNavVis(false)

    return(
        <>
            <Hambutton clickHandler={hamClicked}/>
            <nav ref={navElement} id="main-nav" style={{left: smallNavVis ? 0 : -200}}>
                <button
                 aria-label="close-Navigation"
                 onClick={hideNav} 
                 id="nav-x" 
                 className="button-x" 
                />
                
                {
                    buttonValues.map((value, i)=> <Navbutton key={value} id={i} >{value}</Navbutton>)
                }

                <ColorSchemeButton id="nav-end" />
            </nav>
        </>
    )
}

export default Nav;