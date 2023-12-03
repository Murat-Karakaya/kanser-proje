import { useAtom } from "jotai"
import { pageAtom } from "../../jotai/atoms"

const Page=({children, id})=>{
    const [currentPage]=useAtom(pageAtom)
    return(
        <div aria-hidden={String(currentPage!=id)}
         id={"page"+id}
         className="page">
            {children}
        </div>
    )
}
export default Page