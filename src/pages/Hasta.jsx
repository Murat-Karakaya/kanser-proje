import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import Form from "../components/pageContents/hastaContents/Form"

import { useAtom } from "jotai"
import { pageAtom, userInfoAtom } from "../jotai/atoms"

import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const [, setPage] = useAtom(pageAtom)
    const [userInfo] = useAtom(userInfoAtom)

    useEffect(() => {
        if (userInfo.isdoctor === false) return setPage(0)
        return navigate("/")
    }, [userInfo])
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