import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { patentInfosAtom, patientDoctorRelations, userIdAtom } from "../../../jotai/atoms"
import Relations from "../../RelationsCard.jsx/Relations"
import { useState } from "react"

export default ()=>{
    const [relations, setRelations] = useAtom(patientDoctorRelations)
    const userId = useAtomValue(userIdAtom)
    const setPatientInfos = useSetAtom(patentInfosAtom)
    const [message, setMessage] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const requestToDoctor = async (doctoremail) => {
        if (!doctoremail.includes("@")) return setMessage("Geçerli email doldurunuz")
        setInputValue("")

        const response = await fetch("http://localhost:1234/requestToDoctor", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid: userId, doctoremail})
        })
        if (response.status < 400) {
            setShowInput(false)
            setRelations(relations.concat({doctoremail, isaccepted: false}))
            return;
        }
        if (response.status == 404) return setMessage("Hesabınıza aynı anda birden fazla giriş yapılmış gibi. En son yapılan giriş kabul edilir")
        if (response.status < 500) return setMessage("Email bu siteyi kullanan hiçbir doktorla eşleşmedi")
        return setMessage("Bir hata oluştu")
    }

    const getRelationsAndInfos = async () => {
        setIsLoading(true)
        const response = await fetch("http://localhost:1234/getRelationsAndInfos", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid: userId})
        })
        setIsLoading(false)
        if (response.status < 400) {
            const {relations, patientinfos} = await response.json()
            setPatientInfos(patientinfos)
            setRelations(relations)
            return;
        }
        if(response.status === 404) return setTimeout(() => alert("Hesabınıza aynı anda birden fazla giriş yapılmış gibi. En son yapılan giriş kabul edilir"), 100)
        return setTimeout(() => alert("Bir hata oluştu"), 100)
    }

    const toggleRelation = async (doctoremail, isReject) => {
        if (!doctoremail) return;

        const response = await fetch("http://localhost:1234/toggleRelation", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientid: userId, doctoremail, isReject})
        })

        if(response.status === 404) return alert("Hesabınıza aynı anda birden fazla giriş yapılmış gibi. En son yapılan giriş kabul edilir")
        if(response.status >= 400) return alert("Bir sorun oluştu.");
        const newRelations = relations.filter(el => el.doctoremail !== doctoremail)
        setRelations(newRelations)
        return;
    }

    if (isLoading) {
        return (<>
            <h1>Doktorlarım</h1>
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
        <h1>Doktorlarım</h1>
        <button onClick={getRelationsAndInfos} className="relations-button">
            Sayfayı Yenile
        </button>
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
                    <>
                    <div className="parent-width flex-ended noMargin" id="cancel-container">
                        <button
                        onClick={() => setShowInput(false)}
                        id="cancel-button"
                        className="button-x"
                        />     
                    </div>
                    <div id="add-form">
                        <input
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue}
                        style={{"--fieldset-border": "3px solid var(--page-line)"}} 
                        type="email"
                        className="form-input"
                        placeholder="doktor emaili"
                        />
                        {message && <p style={{marginLeft: 5}}>{message}</p>}
                        <button onClick={() => requestToDoctor(inputValue)} className="relations-button">
                            İstek Gönder
                        </button>
                    </div>
                    </>
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