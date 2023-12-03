import "./hambutton.css";
import { useAtom } from "jotai";
import { darkModeAtom } from "../../jotai/atoms";

export default ({clickHandler}) => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    return(
        <div id="hambutton">
            <button aria-label="hamburger button" onClick={clickHandler} id="menu" >
                <span id="line"></span>
            </button>
            <button className="end" onClick={() => setDarkMode((darkMode) => !darkMode)}>
            <img src={darkMode ? "/light-mode-sun.svg" : "/dark-mode-moon.svg"} alt={darkMode ? "light-mode-sun" : "dark-mode-moon"} />
            </button>
        </div>
    )
}
