import Nav from "../components/nav/nav"
import PageContainer from "../components/pageContainer/pageContainer"

import Doktorlarim from "../components/pageContents/hastaContents/Doktorlarim"
import Portal from "../components/pageContents/hastaContents/Portal"
import Sonuclarim from "../components/pageContents/hastaContents/Sonuclarim"
import Form from "../components/pageContents/hastaContents/Form"

import { useAtomValue } from "jotai"
import { isDoctorAtom } from "../jotai/atoms"

import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const isDoctor = useAtomValue(isDoctorAtom)

    useEffect(() => {
        if (isDoctor !== false) return navigate("/")
    }, [isDoctor])
    
    return (
        <>
        <Nav buttonValues={["Portal", "Doktorlarım", "Sonuçlarım", "Form Doldur"]}/>
        <PageContainer>
            <Portal/>
            <Doktorlarim />
            <Sonuclarim/>
            <Form />
        </PageContainer>
        </>
    )
}