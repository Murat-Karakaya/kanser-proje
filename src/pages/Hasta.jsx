import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"
import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import Form from "../components/pageContents/hastaContents/Form"

export default () => {
    return (
        <>
        <Nav buttonValues={["Portal", "Sonuçlarım", "Form Doldur"]}/>
        <PageContainer>
            <Portal/>
            <Sonuclarim/>
            <Form />
        </PageContainer>
        </>
    )
}