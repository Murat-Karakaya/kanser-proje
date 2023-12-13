import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/doktorContents/Portal"
import Konsultasyon from "../components/pageContents/doktorContents/Konsultasyon"
import Hastalarim from "../components/pageContents/doktorContents/Hastalarim"
import KanserTeshis from "../components/pageContents/doktorContents/KanserTeshis"
import Dijitallestirme from "../components/pageContents/doktorContents/Dijitallestirme"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Hastalarım", "Konsultasyon", "Dijitalleştirme", "Kanser Teşhisi"]}/>
        <PageContainer>
            <Portal/>
            <Hastalarim/>
            <Konsultasyon />
            <Dijitallestirme/>
            <KanserTeshis/>
        </PageContainer>
        </>
    )
}