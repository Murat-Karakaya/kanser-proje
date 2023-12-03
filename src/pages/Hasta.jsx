import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import YapayZeka from "../components/pageContents/hastaContents/YapayZeka"
import Dijitallestirme from "../components/pageContents/hastaContents/Dijitallestirme"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Sonuçlarım", "Dijitalleştirme", "Yapay Zeka"]}/>
        <PageContainer>
            <Portal/>
            <Sonuclarim/>
            <Dijitallestirme/>
            <YapayZeka/>
        </PageContainer>
        </>
    )
}