import { useAtom, useAtomValue } from "jotai"
import { patentInfosAtom, patientDoctorRelations, userIdAtom } from "../../../jotai/atoms"
import Relations from "../../RelationsCard.jsx/Relations"

export default ()=>{
    const [relations, setRelations] = useAtom(patientDoctorRelations)
    const patientInfos = useAtomValue(patentInfosAtom)
    const userId = useAtomValue(userIdAtom)

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
        const data = await response.json()

        if (isReject && typeof(data) === "object") {
            const newRelations = relations.filter(el => el.patientemail !== patientemail)
            setRelations(newRelations)
            return;
        }
        if (!isReject && typeof(data) === "object") {
            const newRelations = relations.map(el => {
                if (el.patientemail === patientemail) {
                    el.isaccepted = true
                }
                return el
            })
            setRelations(newRelations)
            return;
        }
    }
    return(
    <>
        <h1>Hastalarım</h1>
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