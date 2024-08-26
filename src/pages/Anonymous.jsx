import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import { useAtomValue, useSetAtom } from "jotai"
import { darkModeAtom, pageAtom } from "../jotai/atoms"

import HomePage from "../components/pageContents/anonymousContents/HomePage"
import GirisYap from "../components/pageContents/anonymousContents/GirisYap"
import HesapAc from "../components/pageContents/anonymousContents/HesapAc"
import { useEffect } from "react"

export default () => {
    const setPage = useSetAtom(pageAtom)
    const isDarkMode = useAtomValue(darkModeAtom)

    useEffect(() => setPage(0), [])

    return (
        <>
        <Nav buttonValues={["Anasayfa", "Giriş Yap", "Hesap Aç"]}/>
        <div id="anonymous-page-container" style={{backgroundImage: isDarkMode ? 'url("/anonymous-page-dark.svg")' : 'url("/anonymous-page-light.svg")'}}>    
            <PageContainer>
                <HomePage />
                <GirisYap />
                <HesapAc />
            </PageContainer>
        </div>
        </>
    )
}