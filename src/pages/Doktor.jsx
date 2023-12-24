import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/doktorContents/Portal"
import Hastalarim from "../components/pageContents/doktorContents/Hastalarim"
import KanserTeshis from "../components/pageContents/doktorContents/KanserTeshis"

import { useAtom } from "jotai"
import { pageAtom, userInfoAtom } from "../jotai/atoms"

import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const [userInfo] = useAtom(userInfoAtom)
    const [, setPage] = useAtom(pageAtom)

    useEffect(() => {
        if (userInfo.isdoctor) return setPage(0)
        return navigate("/")
    }, [userInfo])
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