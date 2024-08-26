import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/doktorContents/Portal"
import Hastalarim from "../components/pageContents/doktorContents/Hastalarim"
import KanserTeshis from "../components/pageContents/doktorContents/KanserTeshis"

import { useAtomValue } from "jotai"
import { isDoctorAtom } from "../jotai/atoms"

import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const isDoctor = useAtomValue(isDoctorAtom)

    useEffect(() => {if(!isDoctor) return navigate("/")}, [isDoctor])

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