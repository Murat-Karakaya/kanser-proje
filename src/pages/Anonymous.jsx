import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import { useAtom } from "jotai"
import { darkModeAtom } from "../jotai/atoms"

import HomePage from "../components/pageContents/anonymousContents/HomePage"
import GirisYap from "../components/pageContents/anonymousContents/GirisYap"
import HesapAc from "../components/pageContents/anonymousContents/HesapAc"

export default () => {
    const [isDarkMode] = useAtom(darkModeAtom)
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