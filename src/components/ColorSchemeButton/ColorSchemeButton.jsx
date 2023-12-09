import { useAtom } from "jotai"
import { darkModeAtom } from "../../jotai/atoms"

export default (props) => {
    const [isDarkMode, setDarkMode] = useAtom(darkModeAtom)
    return (
        <button {...props} onClick={() => setDarkMode((darkMode) => !darkMode)}>
            <img src={isDarkMode ? "/light-mode-sun.svg" : "/dark-mode-moon.svg"} alt={isDarkMode ? "light-mode-sun" : "dark-mode-moon"} />
        </button>
    )
}