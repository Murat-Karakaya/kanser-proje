import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/doktorContents/Portal"
import Konsultasyon from "../components/pageContents/doktorContents/Konsultasyon"
import Hastalarim from "../components/pageContents/doktorContents/Hastalarim"
import YapayZeka from "../components/pageContents/doktorContents/YapayZeka"
import Dijitallestirme from "../components/pageContents/doktorContents/Dijitallestirme"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Hastalarım", "Konsultasyon", "Dijitalleştirme", "Yapay Zeka"]}/>
        <PageContainer>
            <Portal/>
            <Hastalarim/>
            <Konsultasyon />
            <Dijitallestirme/>
            <YapayZeka/>
        </PageContainer>
        </>
    )
}