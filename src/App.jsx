import Doktor from "./pages/Doktor";
import Hasta from "./pages/Hasta";
import Anonymous from "./pages/Anonymous";

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAtom } from "jotai";
import { darkModeAtom} from "./jotai/atoms";

const App=()=> {
    const [isDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        const rootElement = document.getElementById('root')
        const setRootProperty = (property, value) => rootElement.style.setProperty(property, value);
        
        if (isDarkMode) {
            setRootProperty('--default-color', '#f2f2f2');
            setRootProperty('--page-line', '#f2f2f2');
            setRootProperty('--default-block-background', '#242424');
            setRootProperty("--custom-blue", "rgb(32, 89, 202)")
            setRootProperty("--card-backround", "#2722bd")
            return;
        }
        setRootProperty('--default-color', 'rgb(19, 19, 19)');
        setRootProperty('--default-block-background', 'white');
        setRootProperty('--page-line', 'black');
        setRootProperty("--custom-blue", "rgb(29, 153, 255)")
        setRootProperty("--card-backround", "rgb(0, 191, 255)")
        return;
    }, [isDarkMode])

    return(
        <Routes>
            <Route path="/" element={<Anonymous/>}/>
            <Route path="/doktor" element={<Doktor/>}/>
            <Route path="/hasta" element={<Hasta/>}/>
        </Routes>
    )
}

export default App;