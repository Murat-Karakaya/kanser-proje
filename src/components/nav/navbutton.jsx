import { useAtom } from "jotai";
import { pageAtom } from "../../jotai/atoms";

const Navbutton=({children, id})=>{
    const [pageId,switchPage]=useAtom(pageAtom)
    const whenclicked=()=>{
        switchPage(id)
    }
    return(
        <button onClick={whenclicked} tabIndex={pageId===id ? -1 : 0} id={pageId==id ? "place":""} className="link">
            {children}
        </button>
    )
}

export default Navbutton;