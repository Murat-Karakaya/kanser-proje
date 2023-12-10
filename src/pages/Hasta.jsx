import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import KanserTeshis from "../components/pageContents/hastaContents/KanserTeshis"
import Dijitallestirme from "../components/pageContents/hastaContents/Dijitallestirme"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Sonuçlarım", "Dijitalleştirme", "Kanser Teşhisi"]}/>
        <PageContainer>
            <Portal/>
            <Sonuclarim/>
            <Dijitallestirme/>
            <KanserTeshis/>
        </PageContainer>
        </>
    )
}