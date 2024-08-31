import { useAtom } from "jotai"
import { darkModeAtom } from "../../jotai/atoms"

export default (props) => {
    const [isDarkMode, setDarkMode] = useAtom(darkModeAtom)
    return (
        <button
         {...props} 
         aria-label={isDarkMode ? "use dark mode" : "use light mode"} 
         onClick={() => setDarkMode((darkMode) => !darkMode)}
        >
            <img
             height={40} 
             width={40} 
             src={isDarkMode ? "/light-mode-sun.svg" : "/dark-mode-moon.svg"} 
             alt={isDarkMode ? "light-mode-sun" : "dark-mode-moon"} 
            />
        </button>
    )
}