import { useAtom, useAtomValue } from "jotai"
import { patientDoctorRelations, userIdAtom } from "../../../jotai/atoms"
import Relations from "../../RelationsCard.jsx/Relations"
import { useState } from "react"

export default ()=>{
    const [relations, setRelations] = useAtom(patientDoctorRelations)
    const userId = useAtomValue(userIdAtom)
    const [message, setMessage] = useState("Hellooooo")
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const requestToDoctor = async (doctoremail) => {
        if (!doctoremail.includes("@")) return setMessage("Geçerli email doldurunuz")

        const response = await fetch("http://localhost:1234/requestToDoctor", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid: userId, doctoremail})
        })
        if (response.status < 400) {
            setShowInput(false)
            setRelations([...relations, {doctoremail, isaccepted: false}])
            return;
        }
        if (response.status < 500) return setMessage("Email bu siteyi kullanan hiçbir doktorla eşleşmedi")
        return setMessage("Bir hata oluştu")
    }

    const toggleRelation = async (doctoremail, isReject) => {
        if (!doctoremail) return;

        const response = await fetch("http://localhost:1234/toggleRelation", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid: userId, doctoremail, isReject})
        })
        const data = await response.json()
        if (typeof(data) === "object") setRelations(data)
    }
    return(
    <>
        <h1>Doktorlarım</h1>
        <div className="justify-evenly">
            {relations.map(
                obj => <Relations
                 key={obj.doctoremail}
                 email={obj.doctoremail}
                 isAccepted={obj.isaccepted}
                 toggleRelation={toggleRelation}
                />
            )}
        </div>
        <div className="justify-evenly">
            <div id="add-doctor">
                {
                    showInput ?
                    <div id="add-form">
                        <input
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue}
                        style={{"--fieldset-border": "3px solid var(--page-line)"}} 
                        type="email"
                        className="form-input"
                        placeholder="doktor emaili"
                        />
                        {message && <p>{message}</p>}
                        <button onClick={() => requestToDoctor(inputValue)} className="relations-button">
                            İstek Gönder
                        </button>
                    </div>
                     :
                    <button
                    onClick={() => setShowInput(true)}
                    id="add-button"
                    className="button-x"
                    />    
                }
            </div>
        </div>
    </>
    )
}