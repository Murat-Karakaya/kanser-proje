import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/doktorContents/Portal"
import Hastalarim from "../components/pageContents/doktorContents/Hastalarim"
import KanserTeshis from "../components/pageContents/doktorContents/KanserTeshis"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Hastalarım", "Kanser Teşhisi"]}/>
        <PageContainer>
            <Portal/>
            <Hastalarim/>
            <KanserTeshis/>
        </PageContainer>
        </>
    )
}