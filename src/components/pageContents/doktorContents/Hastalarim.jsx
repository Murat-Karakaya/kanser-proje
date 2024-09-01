import { useAtom, useAtomValue } from "jotai"
import { patentInfosAtom, patientDoctorRelations, userIdAtom } from "../../../jotai/atoms"
import Relations from "../../RelationsCard.jsx/Relations"
import { useState } from "react"

export default ()=>{
    const [relations, setRelations] = useAtom(patientDoctorRelations)
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const userId = useAtomValue(userIdAtom)
    const [isLoading, setIsLoading] = useState(false)

    const findPatientInfos = email => {
        for (const obj of patientInfos) {
            if (obj.patientemail === email) return obj.info
        }
    }

    const toggleRelation = async (patientemail, isReject) => {
        if (!patientemail) return;

        const response = await fetch("http://localhost:1234/toggleRelation", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({doctorid: userId, patientemail, isReject})
        })

        if(response.status >= 400) return;

        if (isReject) {
            const newRelations = relations.filter(el => el.patientemail !== patientemail)
            return setRelations(newRelations)
        }
        const newRelations = relations.map(el => {
            if (el.patientemail === patientemail) el.isaccepted = true
            return el
        })
        return setRelations(newRelations)
    }

    const getRelationsAndInfos = async () => {
        setIsLoading(true)
        const response = await fetch("http://localhost:1234/getRelationsAndInfos", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({doctorid: userId})
        })
        setIsLoading(false)
        if (response.status < 400) {
            const {relations, patientinfos} = await response.json()
            setPatientInfos(patientinfos)
            setRelations(relations)
            return;
        }
        return alert("Bir hata oluştu")
    }

    if (isLoading) {
        return (<>
            <h1>Hastalarım</h1>
            <button onClick={getRelationsAndInfos} className="relations-button">
                Sayfayı Yenile
            </button>
            <br />
            <div className="parent-width flex-centered">
                <div className="loading-blue"></div>
                <p className="form-information">Sayfa yenileniyor...</p>
            </div>
        </>)
    }

    return(
    <>
        <h1>Hastalarım</h1>
        <button onClick={getRelationsAndInfos} className="relations-button">
            Sayfayı Yenile
        </button>
        <div className="justify-evenly">
            {relations.map(
                obj => <Relations
                 info={findPatientInfos(obj.patientemail)}
                 key={obj.patientemail}
                 email={obj.patientemail}
                 isAccepted={obj.isaccepted}
                 toggleRelation={toggleRelation}
                />
            )}  
        </div>
    </>
    )
}