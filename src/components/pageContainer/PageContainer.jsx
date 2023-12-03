import "../pageContents/pageStyles.css";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { pageAtom } from "../../jotai/atoms";


const PageContainer=({children})=>{
    const [pageId] = useAtom(pageAtom)

    useEffect(()=>{
        const currentPage=document.getElementById("page"+pageId)
        currentPage.scrollIntoView({behavior:"smooth"})

        const adjustPage = () => currentPage.scrollIntoView()
        window.addEventListener('resize',adjustPage);

        return(()=>{
            window.removeEventListener('resize',adjustPage)
        })
    },[pageId])

    return(
        <div id="pageContainer">
            {children}
        </div>
    )

}
export default PageContainer