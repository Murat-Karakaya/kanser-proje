import { useAtom, useAtomValue } from "jotai"
import { patientDoctorRelations, userIdAtom } from "../../../jotai/atoms"
import Relations from "../../RelationsCard.jsx/Relations"

export default ()=>{
    const [relations, setRelations] = useAtom(patientDoctorRelations)
    const userId = useAtomValue(userIdAtom)

    const toggleRelation = async (patientemail, isReject) => {
        if (!patientemail) return;

        const response = await fetch("http://localhost:1234/toggleRelation", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({doctorid: userId, patientemail, isReject})
        })
        const data = await response.json()
        console.log(data)
        if (typeof(data)) setRelations(data)
    }
    return(
    <>
        <h1>Hastalarım</h1>
        <div className="justify-evenly">
            {relations.map(
                obj => <Relations
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