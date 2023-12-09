import "./hambutton.css";
import ColorSchemeButton from "../ColorSchemeButton/ColorSchemeButton";

export default ({clickHandler}) => {
    return(
        <div id="hambutton">
            <button aria-label="hamburger button" onClick={clickHandler} id="menu" >
                <span id="line"></span>
            </button>
            <ColorSchemeButton className="end"/>
        </div>
    )
}
