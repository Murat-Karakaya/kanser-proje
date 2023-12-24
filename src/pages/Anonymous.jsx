import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import { useAtom } from "jotai"
import { darkModeAtom, pageAtom, userInfoAtom } from "../jotai/atoms"

import HomePage from "../components/pageContents/anonymousContents/HomePage"
import GirisYap from "../components/pageContents/anonymousContents/GirisYap"
import HesapAc from "../components/pageContents/anonymousContents/HesapAc"
import { useEffect } from "react"

export default () => {
    const [userInfo] = useAtom(userInfoAtom)
    const [, setPage] = useAtom(pageAtom)
    const [isDarkMode] = useAtom(darkModeAtom)

    useEffect(() => setPage(0), [userInfo])

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