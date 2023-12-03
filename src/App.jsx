import Doktor from "./pages/Doktor";
import Hasta from "./pages/Hasta";
import Anonymous from "./pages/Anonymous";

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAtom } from "jotai";
import { darkModeAtom } from "./jotai/atoms";

const App=()=> {
    const [isDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        const rootElement = document.getElementById('root')
        
        if (isDarkMode) {
            rootElement.style.setProperty('--default-color', 'white');
            rootElement.style.setProperty('--page-line', 'white');
            rootElement.style.setProperty('--default-block-background', 'rgb(19, 19, 19)');
            return;
        }
        rootElement.style.setProperty('--default-color', 'rgb(19, 19, 19)');
        rootElement.style.setProperty('--default-block-background', 'white');
        rootElement.style.setProperty('--page-line', 'black');
        return;
    }, [isDarkMode])

    /* useEffect(()=>{
        const observer =new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add("show")
                }
            })
        })
        const hiddenElements = document.querySelectorAll(".reveal")
        hiddenElements.forEach((el) => observer.observe(el))
    },[]) */

    return(
        <Routes>
            <Route path="/" element={<Anonymous/>}/>
            <Route path="/doktor" element={<Doktor/>}/>
            <Route path="/hasta" element={<Hasta/>}/>
        </Routes>
    )
}

export default App;