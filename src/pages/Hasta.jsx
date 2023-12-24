import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import Form from "../components/pageContents/hastaContents/Form"

import { useAtom } from "jotai"
import { isDoctorAtom } from "../jotai/atoms"

import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const [isDoctor] = useAtom(isDoctorAtom)

    useEffect(() => {if (isDoctor !== false) return navigate("/")}, [isDoctor])
    
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