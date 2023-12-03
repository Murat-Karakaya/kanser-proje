import { useAtom } from "jotai";
import { pageAtom } from "../../jotai/atoms";

const Navbutton=({children, id})=>{
    const [pageId,switchPage]=useAtom(pageAtom)
    const whenclicked=()=>{
        switchPage(id)
    }
    return(
        <button onClick={whenclicked} id={pageId==id ? "place":""} className="link">
            {children}
        </button>
    )
}

export default Navbutton;