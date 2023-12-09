import "../pageContents/pageStyles.css";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { pageAtom } from "../../jotai/atoms";

import Page from "./Page";


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
            {
                children.map((element, id) => {
                    return (
                        <Page id={`${id}`} key={id}>
                            {element}
                        </Page>
                    )
                })
            }
        </div>
    )

}
export default PageContainer